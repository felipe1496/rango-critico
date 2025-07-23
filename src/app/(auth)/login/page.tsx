"use client";

import { useGoogleLogin as useOAuthGoogleLogin } from "@react-oauth/google";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/commons/Button";
import { TextInput } from "@/components/commons/TextInput";
import { useAuth } from "@/hooks/useAuth";
import { useGoogleLogin } from "../../../hooks/mutations/useGoogleLogin";

const LoginPage: NextPage = () => {
	const [nicknameConfig, setNicknameConfig] = useState(false);

	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			nickname: "",
			access_token: "",
		},
	});

	const router = useRouter();
	const { onLogin } = useAuth();

	const login = useOAuthGoogleLogin({
		onSuccess: (tokenResponse) => {
			googleLogin({
				access_token: tokenResponse.access_token,
			});
		},
	});

	const { mutate: googleLogin } = useGoogleLogin({
		onSuccess: (res) => {
			onLogin(res.user, res.access_token);
			router.push("/");
		},
		onError: (err, variables) => {
			if (err.status === 400) {
				setNicknameConfig(true);
				setValue("access_token", variables.access_token);
				toast.info("Escolha um nome de usuário para continuar");
			} else if (err.status === 409) {
				toast.error("Nome de usuário já cadastrado");
			}
		},
	});

	if (nicknameConfig) {
		return (
			<main className="flex items-center justify-center w-full h-screen">
				<form
					onSubmit={handleSubmit((data) => {
						googleLogin(data);
					})}
					className="border border-zinc-300 shadow bg-white rounded-sm"
				>
					<div className="w-full border-b border-zinc-300 p-2">
						<h1>Configure seu Usuário</h1>
					</div>

					<div className="py-8 px-16">
						<TextInput
							maxLength={32}
							label="Nome de Usuário"
							{...register("nickname")}
						/>
					</div>

					<div className="bg-zinc-100 p-2 flex justify-end">
						<Button type="submit">Login</Button>
					</div>
				</form>
			</main>
		);
	}

	return (
		<main className="h-screen w-full flex items-center justify-center">
			<Button variant="outlined" onClick={() => login()}>
				<Image src="/google_64.png" alt="Google" width={16} height={16} />
				Login com Google
			</Button>
		</main>
	);
};

export default LoginPage;
