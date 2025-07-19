import Link from "next/link";
import { FC } from "react";
import { Github } from "./commons/icons/Github";

export const Footer: FC = () => (
  <footer className="bg-zinc-100 w-screen px-4 py-8 border-t border-zinc-200 flex flex-col gap-8 mt-auto items-center">
    <div className="max-w-4xl w-full justify-center flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4">
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
            href="/restaurants/new"
            className="font-semibold hover:underline text-sm text-zinc-500"
          >
            Adicionar Restaurante
          </Link>
        </div>

        <div className="flex gap-2 items-center">
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

      <span className="text-zinc-500 text-sm">
        Rango Crítico | Copyright © 2025 - Todos os Direitos Reservados
      </span>
    </div>
  </footer>
);
