import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-primary text-white shadow-sm shadow-slate-900/15 hover:bg-[var(--primary-hover)] hover:shadow-md hover:shadow-slate-900/20 active:bg-[var(--primary-active)] disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-400",
  secondary:
    "border border-border bg-surface text-foreground hover:border-primary/30 hover:bg-primary-soft active:bg-primary-soft disabled:text-muted",
  ghost:
    "text-foreground/75 hover:bg-primary-soft hover:text-foreground active:bg-primary-soft/80 disabled:text-muted/60",
  danger:
    "bg-danger text-white shadow-sm shadow-rose-600/20 hover:bg-rose-500 active:bg-rose-700 disabled:bg-rose-300 disabled:shadow-none",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variants[variant ?? "primary"],
    sizes[size ?? "md"],
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
