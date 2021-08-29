import axios from "axios";
import * as dotenv from "dotenv";

export interface WalletTrasfer {
  type: "wallet";
  id: string;
}

export interface BlockchainTransfer {
  type: "blockchain";
  address: string;
  chain: string;
}

export interface Amount {
  amount: string;
  currency: string;
}

export interface TransferPayload {
  source: WalletTrasfer;
  destination: WalletTrasfer | BlockchainTransfer;
  amount: Amount;
  idempotencyKey: string;
}

dotenv.config();

const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const nullIfEmpty = (prop: string | undefined): string | undefined => {
  if (prop !== undefined && prop.trim() === "") {
    return undefined;
  }
  return prop;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_KEY}`,
  },
});

export async function transfer(payload: TransferPayload): Promise<any> {
  const url = `/v1/transfers`;
  const response = await axiosInstance.post(url, payload);
  return response.data.data;
}
