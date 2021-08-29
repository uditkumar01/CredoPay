import { createContext, useContext, useReducer, useEffect } from "react";
import socketIO from "socket.io-client";
import { getTransactions } from "../../lib/getTransactions";
import {
  Amount,
  BlockchainTransfer,
  WalletTrasfer,
} from "../../lib/transferApi";
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

const HistoryDataContext = createContext({} as HistoryDataInitialState);

const socket = io.connect("https://credopaynotifications.uditkumar01.repl.co");

// function for history data reducerdata
function historyDataReducer(
  state: HistoryDataInitialState,
  action: HistoryDataReducerAction
): HistoryDataInitialState {
  console.log("historyDataReducer", action);
  const newHistoryItem = [...state.transactionsHistory];
  switch (action.type) {
    case "SET_HISTORY_DATA":
      return { ...state, ...action.payload };
    case "ADD_HISTORY_ITEM":
      newHistoryItem.unshift(action.payload.transactionsHistory[0]);
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

  const updateTransactionsHistory = async (): Promise<void> => {
    const newHistoryData = await getTransactions(
      cryptoAccounts,
      authState?.user?.walletId || ""
    );

    // const filteredHistoryData = newHistoryData.filter(
    //   (transaction: Transaction) => {
    //     if (transaction.source.type === "wallet") {
    //       return transaction.source.id === authState.user?.walletId;
    //     }
    //     if (transaction.destination.type === "wallet") {
    //       return transaction.destination.id === authState.user?.walletId;
    //     }
    //     if (transaction.source.type === "blockchain") {
    //       const hashAdd = transaction.source.address;
    //       return cryptoAccounts.some((item) => item.address === hashAdd);
    //     }
    //     if (transaction.destination.type === "blockchain") {
    //       const hashAdd = transaction.destination.address;
    //       return cryptoAccounts.some((item) => item.address === hashAdd);
    //     }
    //     return false;
    //   }
    // );

    console.log({ newHistoryData });

    historyDataDispatch({
      type: "SET_HISTORY_DATA",
      payload: { transactionsHistory: newHistoryData },
    });
  };

  useEffect(() => {
    // socket listener on to get updated transactions status
    (() => {
      socket.on("notification", async (rawData: any) => {
        const data = JSON.parse(rawData);
        console.log(data);
        historyDataDispatch({
          type: "ADD_HISTORY_ITEM",
          payload: { transactionsHistory: [data.transfer] },
        });
      });
    })();
    // socket off on unmount
    return () => {
      socket.off("notification");
    };
  }, []);

  useEffect(() => {
    // get initial transactions data
    if (!showLoadingScreen && authState.isLoggedIn) {
      (() => updateTransactionsHistory())();
    }
  }, [authState.isLoggedIn, showLoadingScreen]);

  return (
    <HistoryDataContext.Provider value={historyDataState}>
      {children}
    </HistoryDataContext.Provider>
  );
}

// making a custom hook for history data
export function useHistoryData(): HistoryDataInitialState {
  const context = useContext(HistoryDataContext);
  if (context === undefined) {
    throw new Error("useHistoryData must be used within a HistoryDataProvider");
  }
  return context;
}
