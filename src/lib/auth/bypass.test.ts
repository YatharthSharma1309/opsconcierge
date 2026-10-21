import { afterEach, describe, expect, it, vi } from "vitest";

describe("auth bypass env helpers", () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const originalAuthBypass = process.env.AUTH_BYPASS;
  const originalPublicAuthBypass = process.env.NEXT_PUBLIC_AUTH_BYPASS;

  afterEach(() => {
    vi.unstubAllEnvs();

    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }

    if (originalAuthBypass === undefined) {
      delete process.env.AUTH_BYPASS;
    } else {
      process.env.AUTH_BYPASS = originalAuthBypass;
    }

    if (originalPublicAuthBypass === undefined) {
      delete process.env.NEXT_PUBLIC_AUTH_BYPASS;
    } else {
      process.env.NEXT_PUBLIC_AUTH_BYPASS = originalPublicAuthBypass;
    }
  });

  it("imports and asserts without DATABASE_URL when NODE_ENV is not production", async () => {
    vi.resetModules();
    delete process.env.DATABASE_URL;
    vi.stubEnv("NODE_ENV", "test");

    const { assertAuthBypassNotInProduction } = await import("./bypass");

    expect(() => assertAuthBypassNotInProduction()).not.toThrow();
  });

  it("is false when AUTH_BYPASS and NEXT_PUBLIC_AUTH_BYPASS are unset", async () => {
    vi.resetModules();
    delete process.env.DATABASE_URL;
    delete process.env.AUTH_BYPASS;
    delete process.env.NEXT_PUBLIC_AUTH_BYPASS;
    vi.stubEnv("NODE_ENV", "test");

    const { isAuthBypassEnabled } = await import("./bypass");

    expect(isAuthBypassEnabled()).toBe(false);
  });
});
