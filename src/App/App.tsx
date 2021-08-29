import "./App.css";
import AllRoutes from "../pages";
import useAuth from "../context/AuthContext/AuthContext";
import { LoadingScreen } from "../components/LoadingScreen/LoadingScreen";

export default function App(): JSX.Element {
  const { showLoadingScreen } = useAuth();
  return showLoadingScreen ? (
    <LoadingScreen />
  ) : (
    <div className="app">
      <AllRoutes />
    </div>
  );
}
