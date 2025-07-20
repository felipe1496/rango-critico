/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isObject } from "lodash";
import { type FC, type ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "@/hooks/useUserStore";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const AppProvider: FC<Readonly<{ children: ReactNode }>> = ({
	children,
}) => {
	const { setUser } = useUserStore();

	useEffect(() => {
		const stored = localStorage.getItem("user");

		if (stored && isObject(JSON.parse(stored))) {
			setUser(JSON.parse(stored));
		}
	}, [setUser]);

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer position="top-left" />
			{children}
		</QueryClientProvider>
	);
};
