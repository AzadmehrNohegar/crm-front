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

export const getProductCategoryById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/product/category/${id}/`);
};

export const postProductCategory = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/product/category/", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const putProductCategoryById = async ({
  body,
  id,
}: AxiosCustomRequestConfig) => {
  return await http.put(`/product/category/${id}/`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductCategoryById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.delete(`/product/category/${id}/`);
};

export const getProductBrand = async ({ params }: AxiosCustomRequestConfig) => {
  return await http.get("/product/brand/", { params });
};

export const getProductProductById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/product/product/${id}/`);
};
