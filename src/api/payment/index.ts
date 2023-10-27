import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getPaymentWalletTransaction = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/payment/wallet_transaction/", { params });
};
