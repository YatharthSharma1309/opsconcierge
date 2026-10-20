import Link from "next/link";
import { cn } from "@/lib/utils";

const boards = [
  { href: "/analytics", id: "inbox", label: "Inbox" },
  { href: "/analytics/hiring", id: "hiring", label: "Hiring" },
] as const;

export function BoardSwitch({ current }: { current: (typeof boards)[number]["id"] }) {
  return (
    <div className="inline-flex rounded-full border border-border bg-surface p-1">
      {boards.map((board) => {
        const active = board.id === current;
        return (
          <Link
            key={board.id}
            href={board.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium",
              active
                ? "bg-primary text-white"
                : "text-muted hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {board.label}
          </Link>
        );
      })}
    </div>
  );
}
