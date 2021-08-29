import { Dispatch } from "react";
import { WalletBalance } from "../StaticData/StaticData";
import { AuthActionType } from "./AuthReducer.types";

export interface AuthUserType {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  walletId: string;
  entityId: string;
  type: string;
  description: string;
  credTag: string;
  balances: Array<WalletBalance>;
}
export interface AuthInitialStateType {
  isLoggedIn: boolean;
  user?: AuthUserType;
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
