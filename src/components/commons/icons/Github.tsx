import type { ComponentProps, FC } from "react";
import { cn } from "@/utils/functions";

interface Props extends ComponentProps<"svg"> {}

export const Github: FC<Props> = ({ className, ...props }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		className={cn("lucide lucide-github-icon lucide-github", className)}
		viewBox="0 0 24 24"
		{...props}
	>
		<title>Github</title>
		<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
		<path d="M9 18c-4.51 2-5-2-7-2"></path>
	</svg>
);
