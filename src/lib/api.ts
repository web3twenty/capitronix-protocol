import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

// Attach token from cookies
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        if (!config.headers) config.headers = {} as AxiosRequestHeaders;

        (config.headers as AxiosRequestHeaders)["Authorization"] =
          `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      typeof window !== "undefined" &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);

export default api;
