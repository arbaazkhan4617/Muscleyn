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
      ) ||
      config.url?.startsWith(
        "/banners"
      ) ||
      config.url?.startsWith(
        "/contact"
      );

    const authToken =
      isAdminRequest
        ? (adminToken || token)
        : (token || adminToken);

    if (authToken) {

      config.headers.Authorization =
        `Bearer ${authToken}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");
      if (token || adminToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("adminToken");
        
        // Retry the request without the Authorization header to see if it's a public endpoint
        if (error.config && !error.config._retry) {
          error.config._retry = true;
          if (error.config.headers) {
            delete error.config.headers.Authorization;
          }
          return api(error.config);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;