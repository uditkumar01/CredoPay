import axios from "axios";
import * as dotenv from "dotenv";
import { CreateWalletPayload } from "../components/CreateWalletModal/CreateWalletModal";

dotenv.config();

const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// const nullIfEmpty = (prop: string | undefined): string | undefined => {
//   if (prop !== undefined && prop.trim() === "") {
//     return undefined;
//   }
//   return prop;
// };

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_KEY}`,
  },
});

// create new wallet
export async function createWallet(payload: CreateWalletPayload): Promise<any> {
  try {
    const url = "/v1/wallets";
    const response = await axiosInstance.post(url, payload);
    return response?.data?.data;
  } catch (error) {
    console.debug(error);
    return error;
  }
}
