/** True when the app has a real Clerk publishable key, not a keyless placeholder. */
export function isClerkConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());
}
