import axios from "axios";
import * as dotenv from "dotenv";
import quertString from "query-string";
import { v4 } from "uuid";
import { firestore } from "../Firebase";

dotenv.config();
// add allow origin in axios instance

// const axiosInstance = axios.create({
//   baseURL: "https://in.staging.decentro.tech",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     client_id: process.env.REACT_APP_DECENTRO_CLIENT_ID,
//     client_secret: process.env.REACT_APP_DECENTRO_CLIENT_SECRET,
//     module_secret: process.env.REACT_APP_DECENTRO_MODULE_SECRET,
//     provider_secret: process.env.REACT_APP_DECENTRO_PROVIDER_SECRET,
//   },
// });

// console.debug(payload);

// parsing upi using query string
export function parseUpi(upi: string): any {
  let parsed = upi;
  if (upi.includes("?")) {
    /* eslint-disable prefer-destructuring */
    parsed = parsed.split("?")[1];
    /* eslint-enable prefer-destructuring */
  }
  try {
    const upiData = quertString.parse(parsed);
    return upiData;
  } catch (e) {
    console.debug(e);
    return {};
  }
}

export async function initiateTransfer(data: any, uid: string): Promise<any> {
  const url = "https://credopaynotifications.uditkumar01.repl.co/pay";
  try {
    if (data?.status === "complete") {
      const userRef = await firestore().collection("users").doc(uid).get();
      const userData = userRef.data();
      const payload = userData?.pendingTransfers?.find((transfer: any) => {
        // console.debug(
        //   transfer,
        //   transfer?.source,
        //   data?.source,
        //   transfer?.destination,
        //   data?.destination,
        //   Number(transfer?.inrToEthAmount)?.toFixed(8),
        //   Number(data?.amount)?.toFixed(8),
        //   transfer?.source === data?.source,
        //   transfer?.destination === data?.destination,
        //   Number(transfer?.inrToEthAmount)?.toFixed(8) ===
        //     Number(data?.amount)?.toFixed(8)
        // );
        return (
          transfer?.source === data?.source &&
          transfer?.destination === data?.destination &&
          Number(transfer?.inrToEthAmount)?.toFixed(8) ===
            Number(data?.amount)?.toFixed(8)
        );
      });
      console.debug(payload, userData, "testing");
      const res = await axios.post(url, payload?.payload);
      console.debug(res.data?.data);
      return {
        success: true,
        ...payload?.payload,
      };
    }

    return { success: false };
  } catch (err) {
    console.debug(err.message);
    return { success: false };
  }
}

export async function queneTransfer(
  idempotencyKey: string,
  upi: string,
  amount: string,
  payeeName: string,
  uid: string,
  pendingTransfers: any,
  inrToEthAmount: number,
  source: string,
  destination: string
): Promise<any> {
  const payload = {
    reference_id: idempotencyKey,
    purpose_message: "UPI Payment",
    from_customer_id: "CRED001",
    to_customer_id: "CRED002",
    from_account: "462515143821274740",
    to_upi: upi,
    mobile_number: "9090909090",
    email_address: "support@credopay.com",
    name: "Credopay",
    transfer_type: "UPI",
    transfer_amount: amount,
    beneficiary_details: {
      email_address: "support@credopay.com",
      mobile_number: "9090909090",
      address: "some_physical_address",
      ifsc_code: "YESB0CMSNOC",
      country_code: "IN",
      payee_name: payeeName,
    },
    currency_code: "INR",
  };

  console.debug(payload, "payload");
  try {
    // quene transfer on firebase
    await firestore()
      .collection("users")
      .doc(uid)
      .update({
        pendingTransfers: [
          ...(pendingTransfers || []),
          { inrToEthAmount, source, destination, payload },
        ],
      });

    return payload;
  } catch (err) {
    console.debug(err.message);
    return err.message;
  }
}
