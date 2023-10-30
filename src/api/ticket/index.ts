import { http, AxiosCustomRequestConfig } from "@/services/axios";

export const postTicketTickets = async ({ body }: AxiosCustomRequestConfig) => {
  return await http.post("/ticket/tickets/", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const postTicketTicketsReplyById = async ({
  body,
  id,
}: AxiosCustomRequestConfig) => {
  return await http.post(`/ticket/tickets_reply/${id}/`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getTicketTickets = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/ticket/tickets/", { params });
};

export const getTicketTicketsById = async ({
  params,
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/ticket/tickets/${id}/`, { params });
};

export const getTicketTicketsReplyById = async ({
  params,
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/ticket/tickets_reply/${id}/`, { params });
};
