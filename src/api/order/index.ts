import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const postOrderCreateOrder = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/order/create_order/", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
