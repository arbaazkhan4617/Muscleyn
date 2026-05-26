import api from "./api";

export type ContactEnquiryPayload = {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export const submitContactEnquiry = async (
  payload: ContactEnquiryPayload
) => {
  const response = await api.post("/contact/enquiries", payload);
  return response.data;
};
