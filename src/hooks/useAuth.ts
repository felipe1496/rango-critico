import type { UserModel } from "@/models/UserModel";
import { useUserStore } from "./useUserStore";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
	const { setUser, user } = useUserStore();

	const queryClient = useQueryClient();

	const onLogin = (user: UserModel, access_token: string) => {
		queryClient.clear();
		try {
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("access_token", access_token);
		} catch {
			toast.error(
				"Ocorreu um erro ao tentar armazenas as informações de login. É recomendável que você não atualize a tela para que não perder a sessão",
			);
		}

		setUser(user);
	};

	const logout = () => {
		queryClient.clear();
		localStorage.removeItem("user");
		localStorage.removeItem("access_token");
		setUser(null);
	};

	return {
		onLogin,
		logout,
		currentUser: user,
	};
};
