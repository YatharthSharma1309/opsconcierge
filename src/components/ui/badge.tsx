import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

const tones = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200/80",
  danger: "bg-rose-50 text-rose-800 ring-1 ring-inset ring-rose-200/80",
  info: "bg-primary-soft text-primary ring-1 ring-inset ring-primary/15",
};

export function Badge({
  className,
  tone = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
