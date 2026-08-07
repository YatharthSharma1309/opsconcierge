import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-primary-soft",
        className,
      )}
      {...props}
    />
  );
}
