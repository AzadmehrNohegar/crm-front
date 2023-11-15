import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getNotificationNotification = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/notification/notification/", { params });
};

export const postNotificationNotification = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/notification/notification/", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const putNotificationNotificationById = async ({
  body,
  id,
}: AxiosCustomRequestConfig) => {
  return await http.put(`/notification/notification/${id}/`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getNotificationNotificationById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/notification/notification/${id}/`);
};

export const deleteNotificationNotificationById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.delete(`/notification/notification/${id}/`);
};
