"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  appPrimaryNav,
  appSecondaryNav,
  filterNavByRole,
  helpHrefForOrg,
  helpNavItem,
  isNavActive,
} from "@/components/layout/app-nav";
import { cn } from "@/lib/utils";
import type { MemberRole } from "@/generated/prisma/client";

type DashboardNavProps = {
  role?: MemberRole;
  organizationSlug?: string;
  className?: string;
};

function navLinkClass(active: boolean) {
  return cn(
    "relative inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    active
      ? "bg-primary-soft text-primary"
      : "text-muted hover:bg-foreground/[0.05] hover:text-foreground",
  );
}

export function DashboardNav({
  role = "AGENT",
  organizationSlug,
  className,
}: DashboardNavProps) {
  const pathname = usePathname();
  const primary = filterNavByRole(appPrimaryNav, role);
  const secondary = filterNavByRole(appSecondaryNav, role);
  const helpHref = helpHrefForOrg(organizationSlug);
  const moreActive =
    secondary.some((item) => isNavActive(pathname, item.href)) ||
    pathname.startsWith("/help");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const HelpIcon = helpNavItem.icon;

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMoreOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "hidden min-w-0 flex-1 items-center justify-start gap-0.5 overflow-x-auto md:flex",
        className,
      )}
    >
      {primary.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={navLinkClass(active)}
          >
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}

      <div ref={moreRef} className="relative">
        <button
          type="button"
          aria-expanded={moreOpen}
          aria-haspopup="menu"
          onClick={() => setMoreOpen((value) => !value)}
          className={navLinkClass(moreActive || moreOpen)}
        >
          More
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              moreOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>
        {moreOpen ? (
          <div
            role="menu"
            className="absolute left-0 top-full z-40 mt-2 min-w-[12rem] rounded-xl border border-border bg-surface p-1 shadow-lg shadow-black/15"
          >
            {secondary.map((item) => {
              const active = isNavActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-foreground hover:bg-foreground/[0.05]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-1 border-t border-border" />
            <Link
              href={helpHref}
              role="menuitem"
              aria-current={pathname.startsWith("/help") ? "page" : undefined}
              onClick={() => setMoreOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname.startsWith("/help")
                  ? "bg-primary-soft text-primary"
                  : "text-foreground hover:bg-foreground/[0.05]",
              )}
            >
              <HelpIcon
                className="h-3.5 w-3.5 shrink-0 text-muted"
                aria-hidden
              />
              {helpNavItem.label}
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
