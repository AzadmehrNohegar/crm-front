import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const postCartCartItem = async ({ body }: AxiosCustomRequestConfig) => {
  return await http.post("/cart/cart_item/", body);
};

export const getCartCart = async () => {
  return await http.get("/cart/cart/");
};
