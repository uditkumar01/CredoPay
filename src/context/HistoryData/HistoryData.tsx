import { createContext, useContext, useReducer, useEffect } from "react";
import socketIO from "socket.io-client";
import { getTransactions } from "../../lib/getTransactions";
import {
  Amount,
  BlockchainTransfer,
  WalletTrasfer,
} from "../../lib/transferApi";

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

// function for history data reducer
function historyDataReducer(
  state: HistoryDataInitialState,
  action: HistoryDataReducerAction
): HistoryDataInitialState {
  switch (action.type) {
    case "SET_HISTORY_DATA":
      return { ...state, ...action.payload };
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

  useEffect(() => {
    // socket listener on to get updated transactions status
    (async () => {
      socket.on("notification", async (data: any) => {
        // console.log(data);
        const newHistoryData = await getTransactions();
        historyDataDispatch({
          type: "SET_HISTORY_DATA",
          payload: { transactionsHistory: newHistoryData },
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
    (async () => {
      const newHistoryData = await getTransactions();
      historyDataDispatch({
        type: "SET_HISTORY_DATA",
        payload: { transactionsHistory: newHistoryData },
      });
    })();
  }, []);

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
