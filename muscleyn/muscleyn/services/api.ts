import axios from "axios";

const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8081/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

api.interceptors.request.use(

  (config) => {

    const adminToken =
      localStorage.getItem(
        "adminToken"
      );

    const token =
      localStorage.getItem(
        "token"
      );

    const isAdminRequest =
      config.url?.startsWith(
        "/admin"
      ) ||
      config.url?.startsWith(
        "/dashboard"
      ) ||
      config.url?.startsWith(
        "/cms"
      ) ||
      config.url?.startsWith(
        "/coupons"
      );

    const authToken =
      isAdminRequest
        ? adminToken
        : token;

    if (authToken) {

      config.headers.Authorization =
        `Bearer ${authToken}`;
    }

    return config;
  }
);

export default api;