import axios, { AxiosResponse } from "axios";
import * as dotenv from "dotenv";
import { CryptoAccount, Wallet } from "../context/StaticData/StaticData";

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

// fetch all blockchain addresses using userWallets
export async function getBlockchainAddresses(
  userWallets: Array<Wallet>
): Promise<Array<CryptoAccount>> {
  const allPromises: Promise<AxiosResponse<any>>[] = [];
  userWallets.forEach((wallet) => {
    allPromises.push(
      axiosInstance.get(
        `https://api-sandbox.circle.com/v1/wallets/${wallet.walletId}/addresses`
      )
    );
  });

  const allAddresses = await Promise.all(allPromises);

  // make list of all addresses
  let allAddressesList: Array<CryptoAccount> = [];
  allAddresses.forEach((res) => {
    console.debug(res?.data?.data);
    allAddressesList = allAddressesList.concat(res?.data?.data);
  });

  return allAddressesList;
}
