import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-primary-soft",
        className,
      )}
      {...props}
    />
  );
}
