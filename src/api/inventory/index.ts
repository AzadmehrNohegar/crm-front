import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const postInventoryAdminCreateInventory = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/inventory/admin_create_inventory/", body);
};
