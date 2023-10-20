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
