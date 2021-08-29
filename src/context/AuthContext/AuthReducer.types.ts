import { AuthUserType } from "./AuthContext.types";

export type AuthActionLoginType = {
  type: "LOGIN";
  payload: boolean;
};

export type AuthActionLogoutType = {
  type: "SET_USER";
  payload: AuthUserType;
};

export type AuthActionBalanceType = {
  type: "BALANCE";
  payload: number;
};

export type AuthActionAssetsType = {
  type: "ASSETS";
  payload: TotalBalances;
};

export interface TotalBalances {
  USDC: number;
  BTC: number;
  ETH: number;
}

export type AuthActionType =
  | AuthActionLoginType
  | AuthActionLogoutType
  | AuthActionBalanceType
  | AuthActionAssetsType;
