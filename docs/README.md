# OpsConcierge documentation

Index for the **OpsConcierge** app (`OpsConcierge-App` / [opsconcierge](https://github.com/YatharthSharma1309/opsconcierge)).

Start here for product context; use Technical for setup and architecture.

## Technical

| Doc | Description |
|-----|-------------|
| [FOUNDATION.md](./FOUNDATION.md) | Modules, routes, schema, local dev |
| [STRUCTURE.md](./STRUCTURE.md) | Shells, lanes, demo path, API map, visual tokens |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Vercel, Neon, Clerk, Gemini/OpenRouter, Firebase RTDB |
| [GCP_AND_GEMINI_SETUP.md](./GCP_AND_GEMINI_SETUP.md) | Free Gemini + Firebase Realtime Database |
| [FREE_LLM.md](./FREE_LLM.md) | No-payment path via OpenRouter free models |
| [../DEPLOY.md](../DEPLOY.md) | Production deploy (Vercel + Neon + Clerk) |
| [PROJECTS.md](./PROJECTS.md) | Inventory of GitHub / Vercel / Neon projects vs live web |
| [../README.md](../README.md) | Repo overview, quick start, demo mode |
| [../cloud-run/ops-worker/README.md](../cloud-run/ops-worker/README.md) | Optional Cloud Run worker (not required for free path) |

## Product

| Doc | Description |
|-----|-------------|
| [PRODUCT_VISION.md](./PRODUCT_VISION.md) | Product, ICP, support + hiring lanes |
| [REAL_WORLD_USE.md](./REAL_WORLD_USE.md) | SMB personas and day-to-day use |
| [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) | Problem / solution / GTM |

## Live demo

| Host | Status |
|------|--------|
| **https://support-ai-nine-mu.vercel.app** | **Public** |
| https://relay-ai-app.vercel.app | Deployment-protected (not public) |

Public host is **OpsConcierge**. `GET /api/health` checks Postgres.

## Demo path

Landing → widget chat → escalate / ticket → **`/widget/intake` execution log** → optional `/recruitment` shortlist.

Verify: `GET https://support-ai-nine-mu.vercel.app/api/health`
