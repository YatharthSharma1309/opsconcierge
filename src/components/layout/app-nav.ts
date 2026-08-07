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
  type LucideIcon,
} from "lucide-react";
import type { MemberRole } from "@/generated/prisma/client";

export type AppNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  /** Shown in drawer/sidebar-style lists */
  description?: string;
};

/** Primary links shown in the top navbar on desktop */
export const appPrimaryNav: AppNavItem[] = [
  { href: "/dashboard", label: "Home", description: "Start here", icon: Home },
  { href: "/widget", label: "Widget", icon: MessageSquare },
  { href: "/tickets", label: "Tickets", icon: Headphones },
  { href: "/recruitment", label: "Hiring", icon: Briefcase },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

/** Secondary links — app footer on desktop + full mobile drawer */
export const appSecondaryNav: AppNavItem[] = [
  { href: "/widget/intake", label: "Runs", icon: ClipboardList },
  { href: "/chat", label: "Chat", icon: Bot },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/settings", label: "Settings", icon: Settings, adminOnly: true },
];

export const appAllNav: AppNavItem[] = [
  ...appPrimaryNav,
  ...appSecondaryNav,
];

export function filterNavByRole(
  items: AppNavItem[],
  role: MemberRole = "AGENT",
) {
  return items.filter((item) => role === "ADMIN" || !item.adminOnly);
}

export function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/widget") {
    return pathname === "/widget" || pathname.startsWith("/widget/embed");
  }
  if (href === "/widget/intake") {
    return pathname === "/widget/intake" || pathname.startsWith("/widget/intake/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function helpHrefForOrg(organizationSlug?: string) {
  return organizationSlug ? `/help/${organizationSlug}` : "/help";
}

export const helpNavItem: AppNavItem = {
  href: "/help",
  label: "Help",
  icon: HelpCircle,
};
