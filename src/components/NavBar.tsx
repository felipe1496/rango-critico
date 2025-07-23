"use client";

import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ReviewDialog } from "./ReviewDialog";
import { UserBox } from "./UserBox";

export const NavBar: FC = () => {
	const { currentUser } = useAuth();

	if (currentUser) {
		return (
			<>
				<header className="hidden md:flex w-full sticky h-16 border-b border-zinc-200 top-0 px-4 items-center justify-center bg-white z-10">
					<div className="w-4xl flex justify-between">
						<Link href="/">
							<span className="text-3xl font-title font-bold">
								Rango Crítico
							</span>
						</Link>
						<UserBox />
					</div>
				</header>

				<nav className="md:hidden fixed bg-white border-t w-full border-zinc-200 bottom-0 h-16 z-10 shadow px-6 flex items-center justify-center">
					<div className="flex w-full justify-between items-center">
						<Link href="/">
							<HomeIcon className="size-8" />
						</Link>

						<ReviewDialog>
							<button
								type="button"
								className="p-1 bg-emerald-500 text-white rounded-full"
							>
								<PlusIcon className="size-7" />
							</button>
						</ReviewDialog>

						<UserBox />
					</div>
				</nav>
			</>
		);
	}
};
