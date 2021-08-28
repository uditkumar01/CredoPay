import axios from "axios";
import * as dotenv from "dotenv";
// import { CreateCardPayload } from "../components/CreateCardModal/CreateCardModal.types";

dotenv.config();

const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_KEY}`,
  },
});

export async function getWallets(): Promise<any> {
  const url = "/v1/wallets";
  const response = await axiosInstance.get(url);
  return response.data;
}
