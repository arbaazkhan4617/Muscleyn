import axios from "axios";

const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://prabhapharma.com/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    const token = localStorage.getItem("token");

    const url = config.url || "";
    let cleanUrl = url;

    // Parse absolute URL to get the pathname if needed
    if (url.startsWith("http://") || url.startsWith("https://")) {
      try {
        cleanUrl = new URL(url).pathname;
      } catch (e) {
        const match = url.match(/^https?:\/\/[^\/]+(\/.*)/);
        if (match && match[1]) {
          cleanUrl = match[1];
        }
      }
    }

    // Strip "/api" prefix if present
    if (cleanUrl.startsWith("/api")) {
      cleanUrl = cleanUrl.substring(4);
    } else if (cleanUrl.startsWith("api/")) {
      cleanUrl = cleanUrl.substring(3);
    }

    // Ensure leading slash for uniform matching
    const normalizedUrl = cleanUrl.startsWith("/") ? cleanUrl : "/" + cleanUrl;

    const isAdminRequest =
      normalizedUrl.startsWith("/admin") ||
      normalizedUrl.startsWith("/dashboard") ||
      normalizedUrl.startsWith("/cms") ||
      normalizedUrl.startsWith("/coupons") ||
      normalizedUrl.startsWith("/banners") ||
      normalizedUrl.startsWith("/contact") ||
      normalizedUrl.startsWith("/files");

    const authToken = isAdminRequest
      ? (adminToken || token)
      : (token || adminToken);

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const token = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");
      const authHeader = error.config?.headers?.Authorization;

      let tokenRemoved = false;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const failedToken = authHeader.substring(7);
        if (failedToken === token) {
          localStorage.removeItem("token");
          tokenRemoved = true;
        } else if (failedToken === adminToken) {
          localStorage.removeItem("adminToken");
          tokenRemoved = true;
          if (typeof window !== "undefined") {
            window.location.href = "/admin/login";
          }
        }
      } else {
        // Fallback: if no Authorization header was found, don't wipe anything arbitrarily
      }

      // Retry the request without the Authorization header to see if it's a public endpoint
      if (error.config && !error.config._retry) {
        error.config._retry = true;
        if (error.config.headers) {
          delete error.config.headers.Authorization;
        }
        return api(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;