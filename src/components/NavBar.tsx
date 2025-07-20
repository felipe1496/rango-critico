"use client";

import Image from "next/image";
import { FC } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./commons/DropdownMenu";

export const NavBar: FC = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  if (currentUser) {
    return (
      <header className="fixed w-screen h-16 border-b border-zinc-200 top-0 px-4 flex items-center justify-center bg-white z-10">
        <div className="w-4xl flex justify-between">
          <span className="text-3xl font-title font-bold">Rango Crítico</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex items-center">
              <Image
                width={32}
                height={32}
                alt="User"
                src={currentUser.avatar_url ?? ""}
                className="rounded-full"
              />
              <ChevronDownIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                <ArrowLeftStartOnRectangleIcon className="size-5" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
  }
};
