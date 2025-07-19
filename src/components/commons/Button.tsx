import { cn } from "@/utils/functions";
import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: "sm" | "md" | "lg";
}

const variants = {
  default: "bg-emerald-400 text-white rounded-sm hover:bg-emerald-500 shadow",
  outlined: "border border-zinc-300 rounded-sm hover:bg-zinc-100",
  danger: "bg-red-500 text-white rounded-sm hover:bg-red-600 shadow",
};

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1",
  lg: "px-6 py-3",
};

export const Button: FC<Props> = ({
  className,
  variant = "default",
  size = "md",
  ...props
}) => (
  <button
    className={cn(
      "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors w-fit",
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  />
);
