"use client";

import Image from "next/image";
import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "./commons/Popover";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const NavBar: FC = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  if (currentUser) {
    return (
      <header className="fixed w-screen h-16 border-b border-zinc-200 top-0 px-4 flex items-center justify-center bg-white z-10">
        <div className="w-4xl flex justify-between">
          <span className="text-3xl font-title font-bold">Rango Crítico</span>
          {/* // TODO: substituir por dropdown menu para ter mais acessibilidade */}
          <Popover>
            <PopoverTrigger className="cursor-pointer flex items-center">
              <Image
                width={32}
                height={32}
                alt="User"
                src={currentUser.avatar_url ?? ""}
                className="rounded-full"
              />
              <ChevronDownIcon className="size-4" />
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent side="bottom" className="w-48 text-sm">
                <button
                  className="text-red-500 flex gap-1 items-center hover:bg-red-50 w-full p-1 rounded-sm cursor-pointer"
                  onClick={() => {
                    logout();
                    router.push("/login");
                  }}
                >
                  <ArrowLeftStartOnRectangleIcon className="size-5" />
                  Sair
                </button>
              </PopoverContent>
            </PopoverPortal>
          </Popover>
        </div>
      </header>
    );
  }
};
