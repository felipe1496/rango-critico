"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/commons/Button";

const ErrorBoundaryPage: NextPage<{ error: any }> = ({ error }) => {
	return (
		<main className="h-screen w-full bg-linear-to-br from-white to bg-red-200 flex items-center justify-center flex-col">
			<Image
				src="/Bug fixing-bro.svg"
				width={460}
				height={400}
				alt="Bug in computer"
			/>
			<h1 className="text-bold text-3xl">Ocorreu um erro inesperado!</h1>
			<p>{error.message}</p>
			<div>
				<Link href="/login">
					<Button variant="danger" className="mt-4">
						Tentar novamente
					</Button>
				</Link>
			</div>
		</main>
	);
};

export default ErrorBoundaryPage;
