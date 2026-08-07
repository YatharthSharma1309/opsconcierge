import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 p-5 shadow-sm transition hover:shadow-md dark:hover:shadow-black/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
          {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
        </div>
        <div className="rounded-xl bg-primary-soft p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
