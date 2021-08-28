import axios, { AxiosResponse } from "axios";
import * as dotenv from "dotenv";
import { BasePaymentPayload } from "../components/CreateCardModal/CreateCardModal.types";

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

const nullIfEmpty = (prop: string | undefined): string | undefined => {
  if (prop === "") {
    return undefined;
  }
  return prop;
};

/**
 * Get balance
 */
export function getBalance(): Promise<AxiosResponse<any>> {
  const url = "/v1/balances";
  return axiosInstance.get(url);
}

/**
 * Create payment
 * @param {*} payload (contains form data and encrypted payment details)
 */
export async function createPayment(payload: BasePaymentPayload): Promise<any> {
  const url = "/v1/payments";
  // if (payload.metadata) {
  //   payload.metadata.phoneNumber = nullIfEmpty(payload.metadata.phoneNumber);
  // }
  const res = await axiosInstance.post(url, payload);

  console.log({ res });
}
