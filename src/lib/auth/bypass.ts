import { isPublicDemoMode } from "@/lib/env/public-demo";

function hasAuthBypassEnv() {
  return (
    process.env.AUTH_BYPASS === "true" ||
    process.env.NEXT_PUBLIC_AUTH_BYPASS === "true"
  );
}

export function isE2eAuthBypass() {
  return process.env.E2E_AUTH_BYPASS === "true" && hasAuthBypassEnv();
}

export function isAuthBypassEnabled() {
  if (isE2eAuthBypass()) return true;
  if (isPublicDemoMode() && hasAuthBypassEnv()) return true;

  return hasAuthBypassEnv() && process.env.NODE_ENV !== "production";
}

export function assertAuthBypassNotInProduction() {
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  if (isE2eAuthBypass()) return;
  if (isPublicDemoMode() && hasAuthBypassEnv()) return;
  if (process.env.CI === "true" && hasAuthBypassEnv()) return;
  if (process.env.NODE_ENV !== "production") return;

  if (hasAuthBypassEnv()) {
    throw new Error("AUTH_BYPASS cannot be enabled in production.");
  }
}
