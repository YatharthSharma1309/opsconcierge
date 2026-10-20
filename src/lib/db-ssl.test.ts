import { describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  process.env.DATABASE_URL =
    "postgres://user:secret@localhost/db?sslmode=disable";
});

import { normalizeDatabaseSslMode } from "./db";

describe("normalizeDatabaseSslMode", () => {
  it("rewrites require, prefer, and verify-ca", () => {
    expect(
      normalizeDatabaseSslMode(
        "postgres://user:secret@localhost/db?sslmode=require&channel_binding=require",
      ),
    ).toBe(
      "postgres://user:secret@localhost/db?sslmode=verify-full&channel_binding=require",
    );

    expect(
      normalizeDatabaseSslMode(
        "postgres://user:secret@localhost/db?sslmode=prefer",
      ),
    ).toBe("postgres://user:secret@localhost/db?sslmode=verify-full");

    expect(
      normalizeDatabaseSslMode(
        "postgres://user:secret@localhost/db?application_name=app&sslmode=verify-ca",
      ),
    ).toBe(
      "postgres://user:secret@localhost/db?application_name=app&sslmode=verify-full",
    );
  });

  it("matches sslmode values case-insensitively", () => {
    expect(
      normalizeDatabaseSslMode(
        "postgres://user:secret@localhost/db?SSLMODE=Require",
      ),
    ).toBe("postgres://user:secret@localhost/db?sslmode=verify-full");
  });

  it("leaves verify-full, disable, and missing sslmode unchanged", () => {
    expect(
      normalizeDatabaseSslMode(
        "postgres://user:secret@localhost/db?sslmode=verify-full",
      ),
    ).toBe("postgres://user:secret@localhost/db?sslmode=verify-full");

    expect(
      normalizeDatabaseSslMode(
        "postgres://user:secret@localhost/db?sslmode=disable",
      ),
    ).toBe("postgres://user:secret@localhost/db?sslmode=disable");

    expect(
      normalizeDatabaseSslMode("postgres://user:secret@localhost/db"),
    ).toBe("postgres://user:secret@localhost/db");
  });

  it("does not re-encode the password", () => {
    const input = "postgres://user:p%40ss%3Aword@localhost/db?sslmode=require";

    expect(normalizeDatabaseSslMode(input)).toBe(
      "postgres://user:p%40ss%3Aword@localhost/db?sslmode=verify-full",
    );
  });
});
