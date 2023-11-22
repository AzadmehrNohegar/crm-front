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

export const putProductProductById = async ({
  id,
  body,
}: AxiosCustomRequestConfig) => {
  return await http.put(`/product/product/${id}/`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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

export const getProductWarehouse = async () => {
  return await http.get("/product/warehouse/");
};

export const getProductProductById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/product/product/${id}/`);
};

export const postProductCreateWholeSale = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/product/create_wholesale_product/", body);
};

export const postProductCreatePacking = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/product/create_packing_product/", body);
};
