"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Bot,
  ClipboardList,
  Headphones,
  HelpCircle,
  Home,
  Inbox,
  MessageSquare,
  Settings,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/utils";
import type { MemberRole } from "@/generated/prisma/client";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  adminOnly?: boolean;
  /** Quiet secondary line under the label */
  description?: string;
};

const primaryNav: NavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    description: "Start here",
    icon: Home,
  },
];

const supportNav: NavItem[] = [
  { href: "/widget", label: "Widget", icon: MessageSquare },
  { href: "/widget/intake", label: "Runs", icon: ClipboardList },
  { href: "/chat", label: "Chat", icon: Bot },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/tickets", label: "Tickets", icon: Headphones },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
];

const hiringNav: NavItem[] = [
  { href: "/recruitment", label: "Recruitment", icon: Briefcase },
];

const moreNav: NavItem[] = [
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings, adminOnly: true },
];

type SidebarContentProps = {
  onNavigate?: () => void;
  className?: string;
  organizationSlug?: string;
  role?: MemberRole;
  showBrand?: boolean;
};

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/widget") {
    return pathname === "/widget" || pathname.startsWith("/widget/embed");
  }
  if (href === "/widget/intake") {
    return pathname === "/widget/intake" || pathname.startsWith("/widget/intake/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavGroup({
  title,
  items,
  pathname,
  onNavigate,
  role,
}: {
  title?: string;
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
  role: MemberRole;
}) {
  const visible = items.filter((item) => role === "ADMIN" || !item.adminOnly);
  if (!visible.length) return null;

  return (
    <div className="mb-5">
      {title ? (
        <p className="mb-1.5 px-3 text-[11px] font-medium text-muted">
          {title}
        </p>
      ) : null}
      <ul className="space-y-0.5">
        {visible.map((item) => {
          const active = isNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-primary-soft hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    active ? "text-primary" : "text-muted",
                  )}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block font-medium">{item.label}</span>
                  {item.description ? (
                    <span
                      className={cn(
                        "mt-0.5 block text-[11px] font-normal",
                        active ? "text-primary/70" : "text-muted",
                      )}
                    >
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SidebarContent({
  onNavigate,
  className,
  organizationSlug,
  role = "AGENT",
  showBrand = true,
}: SidebarContentProps) {
  const pathname = usePathname();
  const helpHref = organizationSlug ? `/help/${organizationSlug}` : "/help";

  return (
    <div className={cn("flex h-full flex-col bg-surface", className)}>
      {showBrand ? (
        <div className="border-b border-border px-4 py-4">
          <BrandLogo
            href="/dashboard"
            showTagline
            onNavigate={onNavigate}
          />
        </div>
      ) : null}

      <nav
        className={cn(
          "flex-1 overflow-y-auto px-2 py-4",
          !showBrand && "pt-2",
        )}
        aria-label="Main"
      >
        <NavGroup
          items={primaryNav}
          pathname={pathname}
          onNavigate={onNavigate}
          role={role}
        />
        <NavGroup
          title="Support"
          items={supportNav}
          pathname={pathname}
          onNavigate={onNavigate}
          role={role}
        />
        <NavGroup
          title="Hiring"
          items={hiringNav}
          pathname={pathname}
          onNavigate={onNavigate}
          role={role}
        />
        <NavGroup
          title="More"
          items={moreNav}
          pathname={pathname}
          onNavigate={onNavigate}
          role={role}
        />
      </nav>

      <div className="border-t border-border px-2 py-3">
        <Link
          href={helpHref}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
            pathname.startsWith("/help")
              ? "bg-primary-soft text-primary"
              : "text-muted hover:bg-primary-soft hover:text-foreground",
          )}
        >
          <HelpCircle
            className={cn(
              "h-4 w-4 shrink-0",
              pathname.startsWith("/help") ? "text-primary" : undefined,
            )}
            aria-hidden
          />
          Help center
        </Link>
      </div>
    </div>
  );
}

type SidebarProps = {
  organizationSlug?: string;
  role?: MemberRole;
};

export function Sidebar({ organizationSlug, role }: SidebarProps) {
  return (
    <aside className="hidden h-full w-60 shrink-0 border-r border-border lg:flex">
      <SidebarContent
        className="w-full"
        organizationSlug={organizationSlug}
        role={role}
      />
    </aside>
  );
}
