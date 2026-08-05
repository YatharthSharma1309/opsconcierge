# OpsConcierge documentation

Docs for the **OpsConcierge-App** repo (Next.js app). Formerly Relay AI; public brand for XPRIZE is **OpsConcierge**.

## Technical

| Doc | Description |
|-----|-------------|
| [FOUNDATION.md](./FOUNDATION.md) | What exists today: modules, routes, database schema, local dev |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design: Vercel, Neon, Clerk, Gemini/OpenRouter, Firebase RTDB |
| [GCP_AND_GEMINI_SETUP.md](./GCP_AND_GEMINI_SETUP.md) | Free Gemini API key + Firebase Realtime Database setup |
| [FREE_LLM.md](./FREE_LLM.md) | No-payment path via OpenRouter free + provider preference |
| [../DEPLOY.md](../DEPLOY.md) | Production deployment on Vercel + Neon + Clerk |
| [../README.md](../README.md) | Repo overview, live demo, judge walkthrough |

## Product / XPRIZE

| Doc | Description |
|-----|-------------|
| [HACKATHON.md](./HACKATHON.md) | Build with Gemini XPRIZE — $2M, deadline, Devpost, eligibility, prizes |
| [PRODUCT_VISION.md](./PRODUCT_VISION.md) | What OpsConcierge is, ICP, support + hiring lanes |
| [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) | Lean problem / solution / GTM |
| [ROADMAP_12_DAYS.md](./ROADMAP_12_DAYS.md) | Day-by-day plan through 17–18 Aug 2026 |
| [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md) | Devpost + demo pre-flight checklist |
| [RULES_SUMMARY.md](./RULES_SUMMARY.md) | Working rules / judging / compliance map |

## Evidence

| Doc | Description |
|-----|-------------|
| [../evidence/README.md](../evidence/README.md) | How to collect submission evidence |
| [../evidence/demo/script.md](../evidence/demo/script.md) | Timed judge demo script |
| [../evidence/customers/outreach-list.md](../evidence/customers/outreach-list.md) | Design-partner outreach template |
| [../evidence/customers/testimonials.md](../evidence/customers/testimonials.md) | Testimonial template |

## Live demos

- https://relay-ai-app.vercel.app
- https://support-ai-nine-mu.vercel.app (legacy alias, same deploy)

## Judge path (XPRIZE)

Landing → widget chat → escalate/ticket → `/widget/intake` execution log.

Verify readiness: `GET /api/health/xprize`
