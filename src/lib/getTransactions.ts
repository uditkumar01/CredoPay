import axios from "axios";
import * as dotenv from "dotenv";
import { Transaction } from "../context/HistoryData/HistoryData";
import { CryptoAccount } from "../context/StaticData/StaticData";

dotenv.config();

const AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// const nullIfEmpty = (prop: string | undefined): string | undefined => {
//   if (prop !== undefined && prop.trim() === "") {
//     return undefined;
//   }
//   return prop;
// };

// https://api-sandbox.circle.com/v1/transfers

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AUTH_KEY}`,
  },
});

// function to get all transactions
export async function getTransactions(
  cryptoAccounts = [] as CryptoAccount[],
  walletId: string
): Promise<any> {
  try {
    const response = await axiosInstance.get("/v1/transfers");
    console.log(response.data?.data);
    const filteredHistoryData = response?.data?.data?.filter(
      (transaction: Transaction) => {
        let checkFlag = false;
        if (transaction.source.type === "wallet") {
          checkFlag = transaction.source.id === walletId;
        }
        if (!checkFlag && transaction.destination.type === "wallet") {
          return transaction.destination.id === walletId;
        }
        if (!checkFlag && transaction.source.type === "blockchain") {
          const hashAdd = transaction.source.address;
          return cryptoAccounts.some((item) => item.address === hashAdd);
        }
        if (!checkFlag && transaction.destination.type === "blockchain") {
          const hashAdd = transaction.destination.address;
          return cryptoAccounts.some((item) => item.address === hashAdd);
        }
        return false;
      }
    );
    return filteredHistoryData;
  } catch (error) {
    console.log(error);
    return error;
  }
}
