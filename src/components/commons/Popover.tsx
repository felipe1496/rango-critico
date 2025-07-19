import { cn } from "@/utils/functions";
import * as RadixPopover from "@radix-ui/react-popover";
import { ComponentProps, FC } from "react";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverPortal = RadixPopover.Portal;
export const PopoverContent: FC<
  ComponentProps<typeof RadixPopover.Content>
> = ({ className, ...props }) => {
  return (
    <RadixPopover.Content
      className={cn(
        "rounded-sm border border-zinc-200 bg-white shadow p-2 z-10",
        className
      )}
      {...props}
    />
  );
};
export const PopoverClose = RadixPopover.Close;
export const PopoverArrow = RadixPopover.Arrow;
