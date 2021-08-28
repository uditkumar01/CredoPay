import axios from "axios";
import * as dotenv from "dotenv";

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
export async function getTransactions(): Promise<any> {
  const response = await axiosInstance.get("/v1/transfers");
  return response?.data?.data;
}
