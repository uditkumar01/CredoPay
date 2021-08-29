import axios from "axios";
import * as dotenv from "dotenv";
import { CreateETHWalletPayload } from "../components/CreateWalletModal/CreateWalletModal";

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

export async function createETHAddress(
  walletId: string | undefined,
  payload: CreateETHWalletPayload
): Promise<any> {
  if (!walletId) return `wallet id is undefined ${walletId}`;
  try {
    const url = `/v1/wallets/${walletId}/addresses`;
    const response = await axiosInstance.post(url, payload);
    return response?.data?.data;
  } catch (err) {
    console.log(err);
    return err.response?.data;
  }
}
