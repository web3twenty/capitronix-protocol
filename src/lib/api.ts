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

let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        if (!config.headers) config.headers = {} as AxiosRequestHeaders;
        (config.headers as AxiosRequestHeaders)[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      typeof window !== "undefined" &&
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              (originalRequest.headers as AxiosRequestHeaders)[
                "Authorization"
              ] = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = refreshResponse.data?.payload?.accessToken;

        if (newToken) {
          Cookies.set("accessToken", newToken, { expires: 30 });
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return api(originalRequest);
        } else {
          throw new Error("No access token returned");
        }
      } catch (err: unknown) {
        processQueue(err, null);
        Cookies.remove("accessToken");
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (typeof window !== "undefined" && error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
