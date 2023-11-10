import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getNotificationNotification = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/notification/notification/", { params });
};

export const getNotificationNotificationById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/notification/notification/${id}/`);
};
