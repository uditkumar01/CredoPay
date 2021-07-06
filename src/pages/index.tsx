import { Routes, Route } from "react-router-dom";
import CreateWallet from "./CreateWallet/CreateWallet";
import Login from "./Login/Login";
import DashBoard from "./DashBoard/DashBoard";
import Home from "./Home/Home";
import Error404 from "./Error404/Error404";

export default function AllRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}
