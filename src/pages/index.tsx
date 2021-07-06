import { Routes, Route } from "react-router-dom";
import CreateWallet from "./CreateWallet/CreateWallet";
import Login from "./Login/Login";
import DashBoard from "./DashBoard/DashBoard";
import Home from "./Home/Home";

export default function AllRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}
