import Link from "next/link";
import { FC } from "react";
import { Github } from "./commons/icons/GIthub";

export const Footer: FC = () => (
  <footer className="bg-zinc-100 w-screen px-4 py-8 border-t border-zinc-200 flex flex-col gap-8 mt-auto">
    <div className="flex flex-col items-center justify-center">
      <span className="font-semibold">Links</span>
      <Link href="https://github.com/felipe1496/rango-critico" target="_blank">
        <div className="flex gap-1 items-center group">
          <Github className="size-4" />
          <span className="group-hover:underline">Github</span>
        </div>
      </Link>
    </div>

    <div className="flex items-center justify-between flex-col md:flex-row">
      <span className="text-zinc-500 text-sm">
        Rango Crítico | Copyright © 2025 - Todos os Direitos Reservados
      </span>

      <div className="flex gap-2">
        <span className="text-emerald-500 hover:underline">
          Política de Privacidade
        </span>
        <span className="text-zinc-400">•</span>
        <span className="text-emerald-500 hover:underline">Termos de uso</span>
      </div>
    </div>
  </footer>
);
