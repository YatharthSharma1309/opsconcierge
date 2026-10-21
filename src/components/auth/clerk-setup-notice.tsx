import Link from "next/link";
import { buttonClassName } from "@/components/ui/button";

export function ClerkSetupNotice() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-surface px-6 py-8 text-center">
      <h1 className="text-lg font-semibold text-foreground">
        Sign-in is not configured yet
      </h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Add <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
        <code>CLERK_SECRET_KEY</code> to <code>.env.local</code>, then restart
        the dev server.
      </p>
      <Link href="/" className={buttonClassName({ size: "sm", className: "mt-6" })}>
        Back home
      </Link>
    </div>
  );
}
