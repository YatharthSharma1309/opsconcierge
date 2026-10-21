import { ClerkProvider } from "@clerk/nextjs";
import { isAuthBypassEnabled } from "@/lib/auth/bypass";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { isClerkConfigured } from "@/lib/env/clerk";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (isAuthBypassEnabled() || !isClerkConfigured()) {
    return <>{children}</>;
  }

  return <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>;
}
