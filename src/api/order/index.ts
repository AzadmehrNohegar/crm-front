import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const postOrderCreateOrder = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/order/create_order/", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postOrderAdminCreateOrder = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/order/admin_create_order/", body);
};

export const getOrderOrderList = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/order/order_list/", { params });
};

export const getOrderOrderListById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/order/order_list/${id}/`);
};

export const putOrderOrderListById = async ({
  id,
  body,
}: AxiosCustomRequestConfig) => {
  return await http.put(`/order/order_list/${id}/`, body);
};
