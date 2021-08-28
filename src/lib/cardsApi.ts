import axios, { AxiosResponse } from "axios";
import * as dotenv from "dotenv";
import { CreateCardPayload } from "../components/CreateCardModal/CreateCardModal.types";

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

export async function getPCIPublicKey(): Promise<{
  keyId: string;
  publicKey: string;
}> {
  const url = "/v1/encryption/public";
  const response = await axiosInstance.get(url);
  return response.data.data;
}

export function createCard(
  payload: CreateCardPayload
): Promise<AxiosResponse<any>> {
  const url = "/v1/cards";
  // if (payload.metadata) {
  //   payload.metadata.phoneNumber = nullIfEmpty(payload.metadata.phoneNumber);
  // }
  return axiosInstance.post(url, payload);
}
