import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/generated/prisma/client";

/** Bump when Prisma schema fields change so HMR drops a stale singleton. */
const PRISMA_CLIENT_GENERATION = "ticket-triage-v2";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  prismaGeneration?: string;
};

function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and run `npx prisma dev`, then paste the postgres:// URL.",
    );
  }

  if (url.startsWith("prisma+postgres://")) {
    throw new Error(
      "DATABASE_URL uses prisma+postgres:// which is not supported by the pg driver. Run `npx prisma dev` and use the direct postgres:// URL it prints.",
    );
  }

  return url;
}

function createPrismaClient() {
  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString: resolveDatabaseUrl(),
    });

  const adapter = new PrismaPg(pool, { schema: "public" });
  const client = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
    globalForPrisma.prisma = client;
    globalForPrisma.prismaGeneration = PRISMA_CLIENT_GENERATION;
  }

  return client;
}

if (
  process.env.NODE_ENV !== "production" &&
  globalForPrisma.prisma &&
  globalForPrisma.prismaGeneration !== PRISMA_CLIENT_GENERATION
) {
  globalForPrisma.prisma = undefined;
}

export const db = globalForPrisma.prisma ?? createPrismaClient();
