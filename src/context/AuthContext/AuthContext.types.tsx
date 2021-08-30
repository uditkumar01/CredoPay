import { Dispatch } from "react";
import { Transaction } from "../HistoryData/HistoryData";
import { WalletBalance } from "../StaticData/StaticData";
import { AuthActionType, TotalBalances } from "./AuthReducer.types";

export interface AuthUserType {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  walletId?: string;
  entityId?: string;
  type?: string;
  description?: string;
  credTag?: string;
  balances?: Array<WalletBalance>;
  ethAddresses?: Array<{
    address: string;
    chain: number;
    currency: string;
    idempotencyKey: string;
  }>;
  transactions?: Array<Transaction>;
  pendingTransactions?: Array<any>;
}
export interface AuthInitialStateType {
  isLoggedIn: boolean;
  user?: AuthUserType;
  balance: number;
  assets: TotalBalances;
}

export interface SignInOutResType {
  success: boolean;
  error?: string;
}

export interface AuthContextValue {
  authState: AuthInitialStateType;
  authDispatch: Dispatch<AuthActionType>;
  signIn: () => Promise<SignInOutResType>;
  signOut: () => Promise<SignInOutResType>;
  showLoadingScreen: boolean;
}
