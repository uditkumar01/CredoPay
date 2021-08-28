import { Layout } from "../../components/Layout/Layout";
import { AccountShell } from "../../components";
import { TotalBalances } from "../../components/CryptoStatCard/CryptoStatCard";
import {
  useStaticData,
  Wallet,
  WalletBalance,
} from "../../context/StaticData/StaticData";

export default function DashBoard(): JSX.Element {
  return (
    <Layout noNavbar>
      <AccountShell />
    </Layout>
  );
}
