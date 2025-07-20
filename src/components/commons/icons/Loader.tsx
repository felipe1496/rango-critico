import type { ComponentProps, FC } from "react";
import { cn } from "@/utils/functions";

interface Props extends ComponentProps<"svg"> {}

export const Loader: FC<Props> = ({ className, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		className={cn(
			"lucide lucide-loader-circle-icon lucide-loader-circle animate-spin",
			className,
		)}
		viewBox="0 0 24 24"
		{...props}
	>
		<title>Loader</title>
		<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
	</svg>
);
