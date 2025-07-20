import type { Metadata } from "next";
import { DM_Serif_Text, Rubik } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";

const geistSans = DM_Serif_Text({
	variable: "--font-title",
	subsets: ["latin"],
	weight: "400",
});

const geistMono = Rubik({
	variable: "--font-paragraph",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Rango Crítico • Seu App de Avaliação de Restaurantes",
	description:
		"Tercerize sua memória com o Rango Crítico, uma banco de dados das suas memórias do que achou dos restaurantes que você visitou",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
