import { useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { AccountShell } from "../../components";
import useAuth from "../../context/AuthContext/AuthContext";

export default function DashBoard(): JSX.Element {
  const {
    authState: { isLoggedIn },
    showLoadingScreen,
  } = useAuth();
  useEffect(() => {
    if (!showLoadingScreen && !isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);
  return (
    <Layout noNavbar>
      <AccountShell />
    </Layout>
  );
}
