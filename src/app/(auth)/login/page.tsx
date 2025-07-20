"use client";

import { Button } from "@/components/commons/Button";
import { useGoogleLogin as useOAuthGoogleLogin } from "@react-oauth/google";
import type { NextPage } from "next";
import Image from "next/image";
import { useGoogleLogin } from "../../../hooks/mutations/useGoogleLogin";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const LoginPage: NextPage = () => {
	const router = useRouter();
	const { onLogin } = useAuth();

	const { mutate: googleLogin } = useGoogleLogin({
		onSuccess: (res) => {
			onLogin(res.user, res.access_token);
			router.push("/");
		},
	});

	const login = useOAuthGoogleLogin({
		onSuccess: (tokenResponse) => {
			googleLogin({
				access_token: tokenResponse.access_token,
			});
		},
	});

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
