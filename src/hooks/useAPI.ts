import { env } from "@/utils/env";
import axios from "axios";
import { toast } from "react-toastify";

const apiV1 = axios.create({
  baseURL: env().NEXT_PUBLIC_API_URL + "/v1",
});

apiV1.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiV1.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast.error("Sua sessão expirou!");
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const useAPI = () => {
  return apiV1;
};
