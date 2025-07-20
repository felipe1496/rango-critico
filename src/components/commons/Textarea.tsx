import { cn } from "@/utils/functions";
import type { FC, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: FC<Props> = ({ className, ...props }) => (
	<textarea
		className={cn(
			className,
			"bg-zinc-100 rounded-sm p-2  focus:bg-zinc-50 focus:shadow-sm focus:ring-0 focus:ring-offset-0 ring-0 focus:outline-none",
		)}
		{...props}
	/>
);
