import api from "./api";

export const getPaymentConfig = async () => {
  const response = await api.get("/admin/payment-config");
  return response.data;
};

export const updatePaymentConfig = async (configData: any) => {
  const response = await api.put("/admin/payment-config", configData);
  return response.data;
};
