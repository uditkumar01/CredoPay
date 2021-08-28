import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { User } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { createUserEntity } from "../../Firebase/User";
import { authReducer } from "./AuthReducer";
import {
  AuthContextValue,
  AuthInitialStateType,
  SignInOutResType,
} from "./AuthContext.types";

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

const signIn = (): SignInOutResType => {
  const provider = new auth.GoogleAuthProvider();

  auth()
    .signInWithPopup(provider)
    .catch((err: any) => {
      console.log("signIn error", err.message, err);
      return { error: "something went wrong", success: false };
    });
  return { success: true };
};

const signOut = (): SignInOutResType => {
  if (auth().currentUser) {
    auth()
      .signOut()
      .catch((err: any) => {
        console.log("signOut error", err.message, err);
        return { error: "something went wrong", success: false };
      });
  }
  return { success: true };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialState: AuthInitialStateType = { isLoggedIn: false };
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const observer = auth().onAuthStateChanged(function (user: User) {
      if (user) {
        authDispatch({
          type: "LOGIN",
          payload: true,
        });
        createUserEntity(user);
      } else {
        authDispatch({
          type: "LOGIN",
          payload: false,
        });
      }
    });
    return () => {
      observer();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuthContext() {
  return useContext(AuthContext) as AuthContextValue;
}
