"use client";

import { useRef, useState } from "react";
import { DashboardTopBar } from "@/components/layout/dashboard-top-bar";
import { MobileNavDrawer } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import type { MemberRole } from "@/generated/prisma/client";

type DashboardShellProps = {
  children: React.ReactNode;
  organizationSlug?: string;
  role?: MemberRole;
};

export function DashboardShell({
  children,
  organizationSlug,
  role = "AGENT",
}: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MobileNavDrawer
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        returnFocusRef={menuButtonRef}
        organizationSlug={organizationSlug}
        role={role}
      />
      <DashboardTopBar
        mobileNavOpen={mobileNavOpen}
        onMobileNavToggle={() => setMobileNavOpen((value) => !value)}
        menuButtonRef={menuButtonRef}
        role={role}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:h-[calc(100dvh-3.5rem)]">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
        <SiteFooter
          variant="app"
          role={role}
          organizationSlug={organizationSlug}
        />
      </div>
    </div>
  );
}
