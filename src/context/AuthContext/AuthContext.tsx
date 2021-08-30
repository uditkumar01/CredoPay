import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth, firebase, firestore } from "../../Firebase";
import { createUserEntity } from "../../Firebase/User";
import { authReducer } from "./AuthReducer";
import {
  AuthContextValue,
  AuthInitialStateType,
  AuthUserType,
  SignInOutResType,
} from "./AuthContext.types";

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

const signIn = async (): Promise<SignInOutResType> => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth()
    .signInWithPopup(provider)
    .catch((err) => {
      console.log("signIn error", err.message, err);
      return { error: "something went wrong", success: false };
    });
  return { success: true };
};

const signOut = async (): Promise<SignInOutResType> => {
  if (auth().currentUser) {
    auth()
      .signOut()
      .catch((err) => {
        console.log("signOut error", err.message, err);
        return { error: "something went wrong", success: false };
      });
  }
  return { success: true };
};

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const initialState: AuthInitialStateType = {
    isLoggedIn: false,
    balance: 0,
    assets: {
      BTC: 0,
      ETH: 0,
      USDC: 0,
    },
  };
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  useEffect(() => {
    const observer = auth().onAuthStateChanged(async function (user) {
      // setShowLoadingScreen(true);
      if (user) {
        authDispatch({
          type: "LOGIN",
          payload: true,
        });
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        const dbUser = userDoc.data();
        authDispatch({
          type: "SET_USER",
          payload: (dbUser as AuthUserType) || ({} as AuthUserType),
        });
        createUserEntity(user);
      } else {
        authDispatch({
          type: "LOGIN",
          payload: false,
        });
      }
      setShowLoadingScreen(false);
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
        showLoadingScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextValue {
  return useContext(AuthContext) as AuthContextValue;
}
