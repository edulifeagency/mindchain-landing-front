import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "../store/useUserStore";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

const api: AxiosInstance = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      useUserStore.getState().clearUser();
    }

    return Promise.reject(error);
  },
);

export default api;
