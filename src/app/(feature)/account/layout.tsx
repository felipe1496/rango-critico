"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { cn } from "@/utils/functions";

const AccountLayout: FC<Readonly<{ children: React.ReactNode }>> = ({
	children,
}) => {
	const pathname = usePathname();

	return (
		<div className=" flex justify-center my-8">
			<div className="w-full max-w-4xl flex items-center justify-between gap-4">
				<nav className="flex flex-col gap-2 w-80">
					<Link
						href="/account/profile"
						className={cn(
							"px-4 py-3 rounded-full",
							pathname.includes("/account/profile") &&
								"text-emerald-500 bg-emerald-50",
						)}
					>
						Perfil
					</Link>
					<Link
						href="/account/restaurants-requests"
						className={cn(
							"px-4 py-3 rounded-full",
							pathname.includes("/account/restaurants-requests") &&
								"text-emerald-500 bg-emerald-50",
						)}
					>
						Adição de Restaurante
					</Link>
				</nav>

				<div className="h-full w-[1px] bg-zinc-200" />

				<div className="w-full h-full">{children}</div>
			</div>
		</div>
	);
};

export default AccountLayout;
