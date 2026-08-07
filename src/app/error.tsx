"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";

function errorHint(message: string | undefined) {
  const msg = (message || "").toLowerCase();
  if (
    msg.includes("database_url") ||
    msg.includes("prisma") ||
    msg.includes("econnrefused") ||
    msg.includes("can't reach database") ||
    msg.includes("p1001") ||
    msg.includes("p1017")
  ) {
    return "Check that Neon/Postgres is reachable and `.env` has a valid `DATABASE_URL` (postgres://…, not prisma+postgres://).";
  }
  if (msg.includes("element type is invalid") || msg.includes("undefined")) {
    return "A UI component failed to render (often a missing icon import). Click Try again after a refresh.";
  }
  return "An unexpected error occurred. Try again, or check the browser console / terminal for details.";
}

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mb-8">
        <BrandLogo showTagline />
      </div>
      <div className="max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <AlertTriangle className="h-6 w-6 text-rose-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {errorHint(error.message)}
        </p>
        {process.env.NODE_ENV === "development" && error.message ? (
          <p className="mt-3 break-words rounded-lg bg-slate-50 p-3 text-left font-mono text-xs text-slate-600">
            {error.message}
          </p>
        ) : null}
        <Button className="mt-5" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
