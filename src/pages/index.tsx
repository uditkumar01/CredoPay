import { Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard/DashBoard";
import Home from "./Home/Home";
import Error404 from "./Error404/Error404";

export default function AllRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}
