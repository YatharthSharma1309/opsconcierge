"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type MarketingHeaderShellProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Client wrapper for sticky marketing chrome.
 * Scroll styling mounts after hydration to avoid mismatch.
 */
export function MarketingHeaderShell({
  className,
  children,
}: MarketingHeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const threshold = 8;

    function updateScrolled() {
      setScrolled(window.scrollY > threshold);
    }

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "glass-panel-scrolled border-border/90 shadow-sm shadow-slate-900/5 dark:shadow-black/30"
          : "glass-panel border-border/70",
        className,
      )}
    >
      {children}
    </header>
  );
}
