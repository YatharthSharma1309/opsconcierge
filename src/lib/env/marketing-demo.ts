/** Client-safe: only treat as demo when auth bypass is actually enabled. */
export function isMarketingDemoMode() {
  return process.env.NEXT_PUBLIC_AUTH_BYPASS === "true";
}

/** Icon keys map to lucide icons in `DemoShortcuts` — keep this module React-free. */
export type DemoModuleIcon = "dashboard" | "widget" | "hiring" | "analytics";

export type DemoModuleLink = {
  href: string;
  label: string;
  hint: string;
  icon: DemoModuleIcon;
};

export const demoModuleLinks: readonly DemoModuleLink[] = [
  {
    href: "/dashboard",
    label: "Home",
    hint: "Start here — tickets and ops overview",
    icon: "dashboard",
  },
  {
    href: "/widget",
    label: "Support widget",
    hint: "FAQ deflection on your site",
    icon: "widget",
  },
  {
    href: "/recruitment",
    label: "Hiring lane",
    hint: "Resume shortlist from PDFs",
    icon: "hiring",
  },
  {
    href: "/analytics",
    label: "Analytics",
    hint: "Deflection and hiring metrics",
    icon: "analytics",
  },
] as const;
