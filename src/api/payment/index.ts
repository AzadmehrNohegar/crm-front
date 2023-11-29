import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getPaymentWalletTransaction = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/payment/wallet_transaction/", { params });
};

export const postPaymentWalletTransaction = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/payment/wallet_transaction/", body);
};

export const postPaymentCreatePayment = async ({
  body,
  headers,
}: AxiosCustomRequestConfig) => {
  return await http.post("/payment/create_payment/", body, {
    headers,
  });
};
