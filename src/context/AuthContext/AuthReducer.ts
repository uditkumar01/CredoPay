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
    default:
      return state;
  }
}
