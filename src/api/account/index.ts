import { http, AxiosCustomRequestConfig } from "@/services/axios";

export const postAccountAuthLoginPassword = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/auth/login-password/", body);
};

export const postAccountAuthLoginOTP = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/auth/login-otp", body);
};

export const postAccountAuthCheckOTP = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/auth/check-otp", body);
};

export const postAccountAuthRegistration = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/auth/registration/", body);
};

export const postAccountAuthRefreshToken = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/auth/refresh-token/", body);
};

export const getAccountMyProfile = async () => {
  return await http.get("/account/account/my_profile/");
};

export const postAccountAuthLogout = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/auth/logout/", body);
};

export const postAccountChangePassword = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/account/change_password/", body);
};

export const getAccountSetting = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/account/setting/", { params });
};

export const putAccountUserUpdate = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.put("/account/user_update/", body);
};
