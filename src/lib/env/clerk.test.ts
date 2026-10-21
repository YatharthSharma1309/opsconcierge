import { afterEach, describe, expect, it, vi } from "vitest";

describe("isClerkConfigured", () => {
  const original = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    } else {
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = original;
    }
  });

  it("is false when the publishable key is missing", async () => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    const { isClerkConfigured } = await import("./clerk");

    expect(isClerkConfigured()).toBe(false);
  });

  it("is true when a publishable key is set", async () => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_example";

    const { isClerkConfigured } = await import("./clerk");

    expect(isClerkConfigured()).toBe(true);
  });
});
