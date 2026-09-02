import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

const api: AxiosInstance = axios.create({
  baseURL,
});

export default api;
