interface MetaData {
  email?: string;
  phoneNumber?: string;
  sessionId: string;
  ipAddress: string;
}

export interface CreateCardPayload {
  idempotencyKey: string;
  keyId: string;
  encryptedData: string;
  billingDetails: {
    name: string;
    city: string;
    country: string;
    line1: string;
    line2: string;
    district: string;
    postalCode: string;
  };
  expMonth: number;
  expYear: number;
  metadata: MetaData;
}

export interface BasePaymentPayload {
  idempotencyKey: string;
  amount: {
    amount: string;
    currency: string;
  };
  source: {
    id: string;
    type: string;
  };
  description: string;
  metadata: MetaData;
}

export interface CreateCardPaymentPayload extends BasePaymentPayload {
  verification?: string;
  verificationSuccessUrl?: string;
  verificationFailureUrl?: string;
  keyId?: string;
  encryptedData?: string;
}
