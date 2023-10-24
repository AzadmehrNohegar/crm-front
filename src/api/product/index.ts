import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getProductIntroProduct = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/product/intro_product/", { params });
};

export const getProductSuggestedProduct = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/product/suggested_product/", { params });
};

export const getProductProduct = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/product/product/", { params });
};

export const getProductCategory = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/product/category/", { params });
};

export const getProductBrand = async ({ params }: AxiosCustomRequestConfig) => {
  return await http.get("/product/brand/", { params });
};
