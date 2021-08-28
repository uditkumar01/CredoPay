import { Dispatch } from "react";
import { AuthActionType } from "./AuthReducer.types";

export interface AuthInitialStateType {
  isLoggedIn: boolean;
}

export interface SignInOutResType {
  success: boolean;
  error?: string;
}

export interface AuthContextValue {
  authState: AuthInitialStateType;
  authDispatch: Dispatch<AuthActionType>;
  signIn: () => SignInOutResType;
  signOut: () => SignInOutResType;
}
