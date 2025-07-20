import { XMarkIcon } from "@heroicons/react/24/outline";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import type { ComponentProps, FC } from "react";
import { cn } from "@/utils/functions";

export const Dialog = RadixAlertDialog.Root;
export const DialogTrigger = RadixAlertDialog.AlertDialogTrigger;
export const DialogPortal = RadixAlertDialog.AlertDialogPortal;

const DialogOverlay = ({
	className,
	...props
}: React.ComponentProps<typeof RadixAlertDialog.Overlay>) => {
	return (
		<RadixAlertDialog.Overlay
			data-slot="dialog-overlay"
			className={cn(
				"fixed inset-0 z-50 bg-black/50 backdrop-blur-xs",
				className,
			)}
			{...props}
		/>
	);
};

export const DialogContent = ({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof RadixAlertDialog.Content> & {
	showCloseButton?: boolean;
}) => {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<RadixAlertDialog.Content
				data-slot="dialog-content"
				className={cn(
					"bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] sm:max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-sm shadow-lg duration-200",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<RadixAlertDialog.Cancel
						data-slot="dialog-close"
						className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer"
					>
						<XMarkIcon className="size-5" />
						<span className="sr-only">Close</span>
					</RadixAlertDialog.Cancel>
				)}
			</RadixAlertDialog.Content>
		</DialogPortal>
	);
};

export const DialogFooter = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"flex gap-2 p-2 bg-zinc-100 justify-end rounded-sm border-t border-zinc-200 mt-auto",
				className,
			)}
			{...props}
		/>
	);
};

export const DialogTitle: FC<
	ComponentProps<typeof RadixAlertDialog.AlertDialogTitle>
> = ({ className, ...props }) => {
	return (
		<RadixAlertDialog.AlertDialogTitle
			className={cn("border-b p-3 border-zinc-200", className)}
			{...props}
		/>
	);
};

export const DialogClose = RadixAlertDialog.Cancel;
