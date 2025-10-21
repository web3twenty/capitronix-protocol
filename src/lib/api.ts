import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
