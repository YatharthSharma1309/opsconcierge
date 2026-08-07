"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type OpsConciergeLogoMarkProps = {
  className?: string;
  size?: number;
  /** Optional override — prefer leaving unset so each mark gets a unique id */
  gradientId?: string;
};

/**
 * OpsConcierge brand mark — OC monogram on a slate→navy→teal tile.
 */
export function OpsConciergeLogoMark({
  className,
  size = 32,
  gradientId,
}: OpsConciergeLogoMarkProps) {
  const reactId = useId().replace(/:/g, "");
  const baseId = gradientId ?? `ops-mark-${reactId}`;
  const shineId = `${baseId}-shine`;

  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={cn("block shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={baseId} x1="3" y1="1" x2="37" y2="39">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="48%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id={shineId} x1="8" y1="2" x2="26" y2="20">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="40" height="40" rx="10" fill={`url(#${baseId})`} />
      <rect width="40" height="40" rx="10" fill={`url(#${shineId})`} />

      <g fill="none" stroke="#fff" strokeWidth="3.1" strokeLinecap="round">
        <circle cx="11.9" cy="20" r="6.6" />
        <path d="M32.35 14.7a7 7 0 1 0 0 10.6" />
      </g>
    </svg>
  );
}

/** @deprecated Use OpsConciergeLogoMark */
export const RelayLogoMark = OpsConciergeLogoMark;
