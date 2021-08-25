import { BasePaymentPayload } from "../CreateCardModal/CreateCardModal.types";

export interface CreateCardPaymentPayload extends BasePaymentPayload {
  verification?: string;
  verificationSuccessUrl?: string;
  verificationFailureUrl?: string;
  keyId?: string;
  encryptedData?: string;
}
