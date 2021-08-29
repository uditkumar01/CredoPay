import { AuthUserType } from "./AuthContext.types";

export type AuthActionLoginType = {
  type: "LOGIN";
  payload: boolean;
};

export type AuthActionLogoutType = {
  type: "SET_USER";
  payload: AuthUserType;
};

export type AuthActionType = AuthActionLoginType | AuthActionLogoutType;
