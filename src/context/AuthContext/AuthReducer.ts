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
      } as AuthInitialStateType;
    default:
      return state;
  }
}
