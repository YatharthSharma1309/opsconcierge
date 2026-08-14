import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const raw = fs.readFileSync(path.join(root, ".env"), "utf8");
const parsed = {};
for (const line of raw.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (!m) continue;
  parsed[m[1]] = m[2].replace(/^"|"$/g, "").trim();
}

const appUrl = "https://support-ai-nine-mu.vercel.app";
const vars = {
  DATABASE_URL: parsed.DATABASE_URL,
  OPENROUTER_API_KEY: parsed.OPENROUTER_API_KEY,
  OPENROUTER_CHAT_MODEL: parsed.OPENROUTER_CHAT_MODEL || "openrouter/free",
  GEMINI_API_KEY: parsed.GEMINI_API_KEY,
  GEMINI_CHAT_MODEL: parsed.GEMINI_CHAT_MODEL || "gemini-3.5-flash",
  AI_PROVIDER_PREFERENCE: "auto",
  APP_URL: appUrl,
  NEXT_PUBLIC_DEMO_RELAY_AI_URL: appUrl,
  PUBLIC_DEMO_MODE: "true",
  NEXT_PUBLIC_PUBLIC_DEMO_MODE: "true",
  AUTH_BYPASS: "true",
  NEXT_PUBLIC_AUTH_BYPASS: "true",
  DEMO_ORGANIZATION_SLUG: parsed.DEMO_ORGANIZATION_SLUG || "demo-company",
  DEMO_USER_EMAIL: parsed.DEMO_USER_EMAIL || "admin@demo.com",
  DEMO_WIDGET_KEY: parsed.DEMO_WIDGET_KEY || "wk_test_e2e_demo_widget_key",
};

if (parsed.DEMO_SEED_SECRET) {
  vars.DEMO_SEED_SECRET = parsed.DEMO_SEED_SECRET;
}
if (parsed.FIREBASE_DATABASE_URL) {
  vars.FIREBASE_DATABASE_URL = parsed.FIREBASE_DATABASE_URL;
  vars.FIREBASE_RTDB_PATH =
    parsed.FIREBASE_RTDB_PATH || "opsconcierge_agent_runs";
}

for (const [key, value] of Object.entries(vars)) {
  if (!value) {
    console.error(`Missing value for ${key}`);
    process.exit(1);
  }
  console.log(`Override ${key} (len=${value.length})`);
  execSync(
    `npx vercel env add ${key} production --value ${JSON.stringify(value)} --yes --force`,
    { stdio: "inherit", shell: true, cwd: root },
  );
}

console.log("Done restoring production env.");
