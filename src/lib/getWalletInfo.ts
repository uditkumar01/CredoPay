import axios from "axios";
import * as dotenv from "dotenv";

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

// get Info of a wallet
export async function getWalletInfo(walletId: string): Promise<any> {
  console.debug({ walletId });
  try {
    const url = `/v1/wallets/${walletId}`;
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (error) {
    console.debug(error.message);
    return false;
  }
}

export default getWalletInfo;
