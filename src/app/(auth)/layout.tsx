import { env } from "@/utils/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { FC } from "react";

const RootLayout: FC<
	Readonly<{
		children: React.ReactNode;
	}>
> = ({ children }) => {
	return (
		<GoogleOAuthProvider clientId={env().NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
			{children}
		</GoogleOAuthProvider>
	);
};

export default RootLayout;
