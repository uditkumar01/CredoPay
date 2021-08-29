import { useEffect } from "react";
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

export default function App(): JSX.Element {
  const { showLoadingScreen } = useAuth();
  const { authDispatch } = useAuth();
  const { userWallets, cryptoData } = useStaticData();
  function getBalancesAndAssets(): {
    balance: number;
    assets: TotalBalances | null;
  } {
    let totalBalances: TotalBalances | null = null;
    if (userWallets && userWallets.length > 0) {
      totalBalances = userWallets.reduce(
        (acc: TotalBalances, wallet: Wallet) => {
          wallet.balances.forEach((balance: WalletBalance) => {
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
      totalBalance = cryptoData.reduce((acc: number, currency) => {
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
    const { assets, balance } = getBalancesAndAssets();
    console.log("assets", assets, "balance", balance);
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
