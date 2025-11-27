import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { queryClient } from "./queryClient";
import { getAccessToken, setAccessToken } from "../auth/tokenStore";

interface RefreshResponse {
  accessToken: string;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Add accessToken automatically
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const original = err.config as InternalAxiosRequestConfig;

    if (original.url?.includes("/admin/refreshtoken")) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401) {
      try {
        const { data } = await api.post<RefreshResponse>("/admin/refreshtoken");

        setAccessToken(data.accessToken);

        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(original);
      } catch {
        queryClient.invalidateQueries({ queryKey: ["session"] });
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
