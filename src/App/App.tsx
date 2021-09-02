import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { useToast } from "@chakra-ui/react";
import { v4 } from "uuid";
import "./App.css";
import AllRoutes from "../pages";
import useAuth from "../context/AuthContext/AuthContext";
import { LoadingScreen } from "../components/LoadingScreen/LoadingScreen";
import {
  useStaticData,
  Wallet,
  WalletBalance,
} from "../context/StaticData/StaticData";
import { TotalBalances } from "../context/AuthContext/AuthReducer.types";
import { initiateTransfer } from "../lib/createDecentroTransfer";
import { firestore } from "../Firebase";

const io: any = socketIO;

const socket = io.connect("https://credopaynotifications.uditkumar01.repl.co");

export default function App(): JSX.Element {
  const { showLoadingScreen } = useAuth();
  const { authDispatch, authState } = useAuth();
  const { userWallets, cryptoData, setTrigger } = useStaticData();
  const toast = useToast();
  const [initiateTransferTrigger, setInitiateTransferTrigger] = useState<{
    amount: string;
    source: string;
    destination: string;
    status: string;
  } | null>(null);

  function getBalancesAndAssets(): {
    balance: number;
    assets: TotalBalances | null;
  } {
    let totalBalances: TotalBalances | null = null;
    if (userWallets && userWallets.length > 0) {
      totalBalances = userWallets.reduce(
        (acc: TotalBalances, wallet: Wallet) => {
          wallet?.balances?.forEach((balance: WalletBalance) => {
            if (balance.currency.includes("USD")) {
              acc.USDC += Number(balance.amount);
            } else {
              acc[balance.currency as keyof TotalBalances] += Number(
                balance.amount
              );
            }
          });
          return acc;
        },
        {
          USDC: 0,
          BTC: 0,
          ETH: 0,
        } as TotalBalances
      );
    }
    let totalBalance = 0;
    if (totalBalances) {
      // calculate total balance and round to 2 decimal places
      totalBalance = cryptoData?.reduce((acc: number, currency) => {
        const tot =
          acc +
          (totalBalances
            ? totalBalances[currency.symbol as keyof TotalBalances] *
              currency.value
            : 0);
        return tot;
      }, 0);

      totalBalance = Math.round(totalBalance * 100) / 100;
    }
    return { assets: totalBalances, balance: totalBalance || 0 };
  }

  useEffect(() => {
    console.log(initiateTransferTrigger, "triggered");
    try {
      if (authState?.user?.uid) {
        (async () => {
          const transferRes = await initiateTransfer(
            initiateTransferTrigger,
            authState?.user?.uid || ""
          );
          console.log(
            transferRes,
            transferRes?.success,
            transferRes?.transfer_amount,
            transferRes?.to_upi,
            "transferRes"
          );
          if (
            transferRes?.success &&
            transferRes?.transfer_amount &&
            transferRes?.to_upi
          ) {
            const transactions = [...(authState?.user?.transactions || [])];
            transactions.unshift({
              id: v4(),
              amount: {
                amount: transferRes?.transfer_amount,
                currency: "INR",
              },
              source: {
                type: "wallet",
                id: authState?.user?.walletId || "creadopay",
              },
              destination: {
                type: "wallet",
                id: transferRes?.to_upi,
              },
              status: "complete",
              createDate: new Date().toISOString(),
            });
            // update current user firebase modal
            try {
              await firestore()
                .collection("users")
                .doc(authState?.user?.uid || "")
                .update({
                  transactions,
                });
              toast({
                title: "Payment Successful",
                // eslint-disable-next-line max-len
                description: `You have successfully paid ${transferRes?.transfer_amount} to ${transferRes?.to_upi}`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } catch (error) {
              console.log(error, "error");
            }

            // console.log(userDoc);
            // update current user local state
            authDispatch({
              type: "UPDATE_TRANSACTION",
              payload: transactions,
            });
            // console.log({ payload, resTransfer });
            // success toast for payment
          }
        })();
      }
    } catch (e) {
      console.log(e);
    }
  }, [initiateTransferTrigger]);

  useEffect(() => {
    // socket listener on to get updated transactions status
    (() => {
      socket.on("notification", async (rawData: any) => {
        const data = JSON.parse(rawData);
        console.log(
          data?.notificationType,
          "transfers",
          data?.notificationType === "transfers"
        );
        if (data?.notificationType === "transfers") {
          setInitiateTransferTrigger({
            amount: data?.transfer?.amount?.amount,
            source: data?.transfer?.source?.id,
            destination: data?.transfer?.destination?.id,
            status: data?.transfer?.status,
          });
          setTrigger((prev) => (prev === 0 ? 1 : 0));
        }
        console.log("data hereeeee", data);
      });
    })();
    // socket off on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  useEffect(() => {
    const { assets, balance } = getBalancesAndAssets();
    if (assets && balance) {
      authDispatch({
        type: "BALANCE",
        payload: balance,
      });
      authDispatch({
        type: "ASSETS",
        payload: assets,
      });
    }
  }, [userWallets, cryptoData]);

  return showLoadingScreen ? (
    <LoadingScreen />
  ) : (
    <div className="app">
      <AllRoutes />
    </div>
  );
}
