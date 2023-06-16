import { useToast } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  Dispatch,
} from "react";
import socketIO from "socket.io-client";
import { getTransactions } from "../../lib/getTransactions";
import {
  Amount,
  BlockchainTransfer,
  WalletTrasfer,
} from "../../lib/transferApi";
import { removeUnderscores } from "../../utils/removeUnderscores";
import useAuth from "../AuthContext/AuthContext";
import { useStaticData } from "../StaticData/StaticData";

const io: any = socketIO;

export interface Transaction {
  id: string;
  source: WalletTrasfer | BlockchainTransfer;
  destination: WalletTrasfer | BlockchainTransfer;
  transactionHash?: string;
  errorCode?: string;
  amount: Amount;
  status: string;
  createDate: string;
}

export interface HistoryDataInitialState {
  transactionsHistory: Array<Transaction>;
}

interface HistoryDataReducerAction {
  type: string;
  payload: HistoryDataInitialState;
}

interface HistoryDataContextValue {
  historyDataState: HistoryDataInitialState;
  historyDataDispatch: Dispatch<HistoryDataReducerAction>;
}

const HistoryDataContext = createContext({} as HistoryDataContextValue);

const socket = io.connect("https://credopaynotifications.uditkumar01.repl.co");

// function for history data reducerdata
function historyDataReducer(
  state: HistoryDataInitialState,
  action: HistoryDataReducerAction
): HistoryDataInitialState {
  const newHistoryItem = [...state.transactionsHistory];
  let newTransaction;
  let restTransactions;
  switch (action.type) {
    case "SET_HISTORY_DATA":
      return { ...state, ...action.payload };
    case "ADD_HISTORY_ITEM":
      [newTransaction, ...restTransactions] =
        action.payload.transactionsHistory;
      if (
        state.transactionsHistory.length > 0 &&
        newTransaction.id === state.transactionsHistory[0].id
      ) {
        // poping the first item
        newHistoryItem.shift();
      }
      newHistoryItem.unshift(newTransaction);
      return {
        ...state,
        transactionsHistory: newHistoryItem,
      };
    default:
      return state;
  }
}

// provider function
export function HistoryDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [historyDataState, historyDataDispatch] = useReducer(
    historyDataReducer,
    {
      transactionsHistory: [],
    } as HistoryDataInitialState
  );
  const { authState, showLoadingScreen } = useAuth();
  const { cryptoAccounts } = useStaticData();
  const toast = useToast();

  const updateTransactionsHistory = async (): Promise<void> => {
    const newHistoryData = await getTransactions(
      cryptoAccounts,
      authState?.user?.walletId || ""
    );

    // sort in descending order of createDate
    const sortedData = [...newHistoryData];

    sortedData.sort((a: any, b: any) => {
      return (new Date(b.createDate) as any) - (new Date(a.createDate) as any);
    });

    console.debug({ sortedData });

    historyDataDispatch({
      type: "SET_HISTORY_DATA",
      payload: { transactionsHistory: [...sortedData] },
    });
  };

  useEffect(() => {
    if (!authState?.user?.walletId) return;
    console.debug("listening...");
    // socket listener on to get updated transactions status
    (() => {
      socket.on("notification", async (rawData: any) => {
        const data = JSON.parse(rawData);
        const currentWalletId = authState?.user?.walletId;
        console.debug(data, data?.notificationType);
        if (data?.notificationType === "transfers") {
          if (currentWalletId === data?.transfer?.source?.id) {
            toast({
              title: data?.transfer?.errorCode
                ? "Transaction Failed"
                : "Transaction Successful!",
              description: data?.transfer?.errorCode
                ? `Failed due to ${removeUnderscores(
                    data?.transfer?.errorCode || ""
                  )}`
                : `Sent ${data?.transfer?.amount?.amount} ${data?.transfer?.amount?.currency} to ${data?.transfer?.destination?.id} ${data?.transfer?.destination?.type}`,
              status: data?.transfer?.errorCode ? "error" : "success",
              duration: 5000,
              isClosable: true,
            });
          } else if (!data?.transfer?.errorCode) {
            toast({
              title: "Crypto Received!",
              description: `Received ${data?.transfer?.amount?.amount} ${data?.transfer?.amount?.currency} sent by ${data?.transfer?.source?.id} ${data?.transfer?.source?.type}`,
              status: data?.transfer?.errorCode ? "error" : "success",
              duration: 5000,
              isClosable: true,
            });
          }
          historyDataDispatch({
            type: "ADD_HISTORY_ITEM",
            payload: { transactionsHistory: [data?.transfer] },
          });
        } else if (data?.notificationType === "cards") {
          // toast for card status
          console.debug("card notification");
          if (data?.card?.status === "complete") {
            toast({
              title: "Card Activated",
              description: `Your ${data?.card?.network} card is successfully activated`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Card Activation Failed",
              description: `Failed due to ${removeUnderscores(
                data?.card?.errorCode || ""
              )}`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      });
    })();
    // socket off on unmount
    return () => {
      socket.off("notification");
    };
  }, [authState?.user?.walletId]);

  useEffect(() => {
    // get initial transactions data
    if (!showLoadingScreen && authState.isLoggedIn) {
      (() => updateTransactionsHistory())();
    }
  }, [authState.isLoggedIn, showLoadingScreen]);

  return (
    <HistoryDataContext.Provider
      value={{ historyDataState, historyDataDispatch }}
    >
      {children}
    </HistoryDataContext.Provider>
  );
}

// making a custom hook for history data
export function useHistoryData(): HistoryDataContextValue {
  const context = useContext(HistoryDataContext);
  if (context === undefined) {
    throw new Error("useHistoryData must be used within a HistoryDataProvider");
  }
  return context;
}
