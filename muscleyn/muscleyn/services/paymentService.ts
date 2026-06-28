import api from "./api";

export interface CreatePaymentRequest {

  orderId: number;

  amount: number;

  paymentGateway:
    "RAZORPAY"
    | "PHONEPE";
}

export interface VerifyPaymentRequest {

  orderId: number;

  paymentGateway:
    "RAZORPAY"
    | "PHONEPE";

  razorpayOrderId?: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;
}

// CREATE PAYMENT
export const createPayment =
  async (
    data: CreatePaymentRequest
  ) => {

    const response =

      await api.post(

        "/payments/create",

        data
      );

    return response.data;
};

// VERIFY PAYMENT
export const verifyPayment =
  async (
    data: VerifyPaymentRequest
  ) => {

    const response =

      await api.post(

        "/payments/verify",

        data
      );

    return response.data;
};

// GET PUBLIC PAYMENT CONFIG
export const getPublicPaymentConfig = async () => {
  const response = await api.get("/payment-config");
  return response.data;
};