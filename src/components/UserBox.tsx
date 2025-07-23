import {
	ArrowLeftStartOnRectangleIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
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

export const UserBox: FC = () => {
	const { currentUser, logout } = useAuth();
	const router = useRouter();

	if (!currentUser) {
		return null;
	}

	return (
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
					<DropdownMenuItem asChild>
						<Link href="/account/profile">Perfil</Link>
					</DropdownMenuItem>
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
	);
};
