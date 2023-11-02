import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const postOrderCreateOrder = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/order/create_order/", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getOrderOrderList = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/order/order_list/", { params });
};

export const getOrderOrderListById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/order/order_list/${id}`);
};
