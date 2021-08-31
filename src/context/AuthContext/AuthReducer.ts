import { AuthInitialStateType } from "./AuthContext.types";
import { AuthActionType } from "./AuthReducer.types";

export function authReducer(
  state: AuthInitialStateType,
  action: AuthActionType
): AuthInitialStateType {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "BALANCE":
      return {
        ...state,
        balance: action.payload,
      };
    case "ASSETS":
      return {
        ...state,
        assets: action.payload,
      };
    case "UPDATE_TRANSACTION":
      console.log(action.payload, "focus");
      return {
        ...state,
        user: {
          ...state.user,
          transactions: [...action.payload],
        },
      };
    default:
      return state;
  }
}