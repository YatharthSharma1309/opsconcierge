import { cn } from "@/lib/utils";

type ScoreBadgeProps = {
  score: number | null;
  className?: string;
};

function scoreTone(score: number): string {
  if (score >= 80) return "bg-success/15 text-success ring-success/30";
  if (score >= 60) return "bg-primary-soft text-primary ring-primary/25";
  if (score >= 40) return "bg-warning/15 text-warning ring-warning/30";
  return "bg-foreground/[0.06] text-muted ring-border";
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  if (score === null) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-foreground/[0.04] text-muted ring-border",
          className,
        )}
      >
        —
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        scoreTone(score),
        className,
      )}
    >
      {score}%
    </span>
  );
}
