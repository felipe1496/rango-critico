import Link from "next/link";
import type { FC } from "react";
import { Github } from "./commons/icons/Github";

export const Footer: FC = () => (
	<footer className="bg-zinc-100 px-4 py-8 border-t border-zinc-200 flex flex-col gap-8 mt-auto items-center w-full">
		<div className="max-w-4xl flex flex-col gap-4 w-full">
			<div className="flex flex-col gap-4 items-center justify-between w-full md:flex-row">
				<div className="flex flex-col gap-2 md:flex-row md:gap-4 items-center text-center w-full">
					<Link
						href="/about"
						className="font-semibold hover:underline text-sm text-zinc-500"
					>
						Sobre
					</Link>
					<Link
						href="/policy"
						className="font-semibold hover:underline text-sm text-zinc-500"
					>
						Política de Privacidade
					</Link>
					<Link
						href="/terms"
						className="font-semibold hover:underline text-sm text-zinc-500"
					>
						Termo de Uso
					</Link>
					<Link
						href="/contact"
						className="font-semibold hover:underline text-sm text-zinc-500"
					>
						Contato
					</Link>
					<Link
						href="/account/restaurants-requests"
						className="font-semibold hover:underline text-sm text-zinc-500"
					>
						Adicionar Restaurante
					</Link>
				</div>

				<div className="flex gap-2 items-center md:flex-row">
					<Link
						href="https://github.com/felipe1496/rango-critico"
						target="_blank"
					>
						<div className="flex gap-1 items-center group">
							<Github className="size-4" />
						</div>
					</Link>
				</div>
			</div>

			<span className="text-zinc-500 text-sm text-center md:text-start">
				Rango Crítico | Copyright © 2025 - Todos os Direitos Reservados
			</span>
		</div>
	</footer>
);
