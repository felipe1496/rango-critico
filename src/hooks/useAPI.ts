import axios from "axios";
import { toast } from "react-toastify";
import { env } from "@/utils/env";
import { reviveDates } from "@/utils/functions";

const apiV1 = axios.create({
	baseURL: `${env().NEXT_PUBLIC_API_URL}/v1`,
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
			// TODO: consertar bug onde toast nao permanece depois de navegar para tela de login
			localStorage.removeItem("user");
			localStorage.removeItem("access_token");
			toast.error("Sua sessão expirou!");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

apiV1.interceptors.response.use((response) => {
	response.data = reviveDates(response.data);
	return response;
});

export const useAPI = () => {
	return apiV1;
};
