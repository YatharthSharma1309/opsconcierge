# OpsConcierge documentation

Index for the **OpsConcierge** app (`OpsConcierge-App` / [opsconcierge](https://github.com/YatharthSharma1309/opsconcierge)).

Start here for product + hackathon context; use Technical for setup and architecture.

## Technical

| Doc | Description |
|-----|-------------|
| [FOUNDATION.md](./FOUNDATION.md) | Modules, routes, schema, local dev |
| [STRUCTURE.md](./STRUCTURE.md) | Shells, lanes, judge path, API map, visual tokens |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Vercel, Neon, Clerk, Gemini/OpenRouter, Firebase RTDB |
| [GCP_AND_GEMINI_SETUP.md](./GCP_AND_GEMINI_SETUP.md) | Free Gemini + Firebase Realtime Database |
| [FREE_LLM.md](./FREE_LLM.md) | No-payment path via OpenRouter free models |
| [../DEPLOY.md](../DEPLOY.md) | Production deploy (Vercel + Neon + Clerk) |
| [PROJECTS.md](./PROJECTS.md) | Inventory of GitHub / Vercel / Neon projects vs live web |
| [../README.md](../README.md) | Repo overview, quick start, demo mode |
| [../cloud-run/ops-worker/README.md](../cloud-run/ops-worker/README.md) | Optional Cloud Run worker (not required for free path) |

## Product / XPRIZE

| Doc | Description |
|-----|-------------|
| [HACKATHON.md](./HACKATHON.md) | Build with Gemini XPRIZE — deadline, Devpost, prizes |
| [PRODUCT_VISION.md](./PRODUCT_VISION.md) | Product, ICP, support + hiring lanes |
| [REAL_WORLD_USE.md](./REAL_WORLD_USE.md) | SMB personas and day-to-day use |
| [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) | Problem / solution / GTM |
| [ROADMAP_12_DAYS.md](./ROADMAP_12_DAYS.md) | Day-by-day plan through mid-Aug 2026 |
| [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md) | Devpost + demo pre-flight |
| [RULES_SUMMARY.md](./RULES_SUMMARY.md) | Judging / compliance map |

## Evidence

| Doc | Description |
|-----|-------------|
| [../evidence/README.md](../evidence/README.md) | How to collect submission evidence |
| [../evidence/demo/script.md](../evidence/demo/script.md) | Timed judge demo script |
| [../evidence/customers/outreach-list.md](../evidence/customers/outreach-list.md) | Design-partner outreach |
| [../evidence/customers/testimonials.md](../evidence/customers/testimonials.md) | Testimonial template |

## Live demos

| Host | Status (checked Aug 2026) |
|------|---------------------------|
| **https://support-ai-nine-mu.vercel.app** | **Public** — primary for judges |
| https://relay-ai-app.vercel.app | Deployment-protected (not public) |

Public host may still show legacy **Relay AI** branding until redeploy of this OpsConcierge codebase. `GET /api/health/xprize` is in-repo but **404 on the current public deploy** until redeploy.

## Judge path (XPRIZE)

Landing → widget chat → escalate / ticket → **`/widget/intake` execution log** → optional `/recruitment` shortlist.

Verify after redeploy: `GET https://support-ai-nine-mu.vercel.app/api/health/xprize`  
Until then: `GET https://support-ai-nine-mu.vercel.app/api/health`
