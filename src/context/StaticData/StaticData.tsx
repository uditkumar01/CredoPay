import axios, { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { firestore } from "../../Firebase";
import { getBlockchainAddresses } from "../../lib/getCryptoAddresses";
import { getWallets } from "../../lib/getWallets";
import useAuth from "../AuthContext/AuthContext";
import { AuthUserType } from "../AuthContext/AuthContext.types";
// import { getWallets } from "../../lib/getWallets";

interface CoinData {
  label: "bitcoin" | "ethereum" | "solana" | "usdc";
  symbol: string;
  currency: string;
  value: number;
  change: {
    value: number;
    percent: number;
  };
}

interface StaticDataAction {
  type: string;
  payload: InitialValues;
}

export interface WalletBalance {
  amount: string;
  currency: string;
}

export interface Wallet {
  walletId: string;
  entityId: string;
  type: string;
  description: string;
  balances: Array<WalletBalance>;
}

export interface CryptoAccount {
  address: string;
  currency: string;
  chain: string;
}

interface InitialValues {
  cryptoData: Array<CoinData>;
  userWallets: Array<Wallet>;
  cryptoAccounts: Array<CryptoAccount>;
  allUsers: Array<AuthUserType>;
}

const StaticDataContext = createContext({} as InitialValues);

// https://api.coingecko.com/api/v3/coins/bitcoin
// https://api.coingecko.com/api/v3/coins/ethereum

// function to call apis to get crypto data using Promise all

async function getCryptoData(): Promise<any> {
  // get crypto data from api
  try {
    const promises = [
      axios.get("https://api.coingecko.com/api/v3/coins/bitcoin"),
      axios.get("https://api.coingecko.com/api/v3/coins/ethereum"),
    ];

    const responses = await Promise.all(promises);
    const resData: Array<CoinData> = responses?.map((res) => {
      const data: CoinData = {
        symbol: res?.data?.symbol?.toUpperCase(),
        label: res?.data?.id,
        value: res?.data?.market_data?.current_price?.usd, // value in usd
        change: {
          value: res?.data?.market_data?.price_change_24h,
          percent: res?.data?.market_data?.price_change_percentage_24h,
        },
        currency: "$",
      };
      return data;
    });

    resData.push({
      symbol: "USDC",
      label: "usdc",
      value: 1, // value in usd
      change: {
        value: 0.000011,
        percent: 0.000011,
      },
      currency: "$",
    });

    return {
      cryptoData: resData,
    };
  } catch (e) {
    console.log("while getting crypto data", e);
  }
  return []; // unecessary
}

// get wallets from circle api

function staticDataReducer(
  state: InitialValues,
  action: StaticDataAction
): InitialValues {
  switch (action.type) {
    case "SET_STATIC_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function StaticDataContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [staticDataState, staticDataDispatch] = useReducer(
    staticDataReducer,
    {} as InitialValues
  );
  const { authState, showLoadingScreen } = useAuth();

  async function getUserWallets(): Promise<any> {
    const resUserWallets = await getWallets();
    console.log("resUserWallets", resUserWallets);
    // find current user wallets
    return resUserWallets?.filter(
      (wallet: Wallet) => wallet?.walletId === authState?.user?.walletId
    );
  }

  useEffect(() => {
    if (!showLoadingScreen && authState.isLoggedIn) {
      console.log("getting static data");
      (async () => {
        try {
          const resCryptoData = await getCryptoData();
          const resUserWallets = await getUserWallets();
          const resBlockchainAddresses = await getBlockchainAddresses(
            resUserWallets
          );
          // getting all users from firestore
          const allUsers = await firestore().collection("users").get();
          const allUsersData = allUsers?.docs?.map((doc) => doc.data());
          staticDataDispatch({
            type: "SET_STATIC_DATA",
            payload: {
              ...resCryptoData,
              userWallets: resUserWallets,
              cryptoAccounts: resBlockchainAddresses,
              allUsers: allUsersData,
            },
          });
        } catch (e) {
          console.log("while static data fetching", e);
        }
      })();
    }
  }, [authState.isLoggedIn, showLoadingScreen]);

  console.log("staticDataState", staticDataState);

  return (
    <StaticDataContext.Provider value={staticDataState}>
      {children}
    </StaticDataContext.Provider>
  );
}

// custom hook to get static data
export function useStaticData(): InitialValues {
  const staticData = useContext(StaticDataContext);
  if (!staticData) {
    throw new Error("useStaticData must be used within a StaticDataContext");
  }
  return staticData;
}
