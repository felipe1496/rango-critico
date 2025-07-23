import {
	type ComponentProps,
	type ElementType,
	type FC,
	Fragment,
} from "react";
import { cn } from "@/utils/functions";

interface Props extends ComponentProps<"input"> {
	label?: string;
	error?: string;
}

export const TextInput: FC<Props> = ({
	className,
	type = "text",
	label,
	error,
	...props
}) => {
	let Wrapper: ElementType = Fragment;

	const wrapperProps: ComponentProps<"label"> = {};

	if (label) {
		Wrapper = "label";
		wrapperProps.className = "flex flex-col gap-1";
	}

	return (
		<Wrapper>
			{label && (
				<span className="text-sm" data-error={error}>
					{label}
				</span>
			)}
			<input
				type={type}
				data-slot="input"
				className={cn(
					"file:text-foreground placeholder:text-zinc-500 selection:bg-emerald-500 flex h-9 w-full min-w-0 rounded-sm border border-zinc-300 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:ring-[3px]",
					"aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
					className,
				)}
				{...props}
			/>
		</Wrapper>
	);
};
