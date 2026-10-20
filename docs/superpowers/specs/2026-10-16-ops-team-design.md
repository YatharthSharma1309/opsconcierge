# OpsConcierge team and hackathon cleanup

**Date:** 16 October 2026  
**Status:** Approved in chat. Not implemented.  
**Location:** this repo, so the team and the cleanup rules survive later sessions.

## Decisions

1. The team is four project skills. There is no one-off research pack in this pass, and the skills are not always-on rules.
2. Hackathon leftovers come out. Support and hiring stay.
3. Gemini, OpenRouter, Firebase Realtime Database, execution logs, and `GET /api/health` stay. They run the product.

## Team

Skills live under `.agents/skills/`, next to the existing Neon skills. Each skill is one `SKILL.md` with `name` and `description` frontmatter. The description lists the phrases that should load it.

`AGENTS.md` gains a short router after the Next.js block. It tells the agent to read the matching skill before doing that work. Skills stay unloaded until the request matches.

| Skill | Path | Loads when the user asks to |
|---|---|---|
| Builder | `.agents/skills/ops-builder/SKILL.md` | change, fix, or extend this app |
| Customer finder | `.agents/skills/customer-finder/SKILL.md` | find buyers or design partners |
| UI scout | `.agents/skills/ui-scout/SKILL.md` | refresh a screen against current product UI |
| Competitor analyst | `.agents/skills/competitor-analyst/SKILL.md` | map rivals, products, or prices |

### Shared rules

- A missing price, email, or quote is written as `not published`. Nothing is invented.
- No skill sends email, posts, or contacts anyone.
- The Builder does not remove the support lane or the hiring lane.
- The Customer finder lists a company only when a public page shows the fit. It does not pad the list.
- The UI scout recommends for a named OpsConcierge screen. It does not restyle the app unless the user then asks the Builder to.
- The Competitor analyst records the page URL and the date seen. A price that is not on that page stays `not published`.

### Builder

**Sources:** this repo, and Next.js docs under `node_modules/next/dist/docs/` before writing framework code.

**Answer shape:**

- What changed
- Why
- How it was checked (command or manual path, and what failed if anything failed)

### Customer finder

**Sources:** public company sites, public job posts, and public review pages.

**Fit:** a 5–50 person company whose founder or ops lead still owns support or a hiring sprint. Primary lookalikes are D2C brands, early SaaS, and local services or tutoring.

**Answer shape, one row per company:**

- Company
- Public URL
- Why they fit
- Public signal (page and what it shows)
- First-touch note (a suggested opener, not a sent message)

Unknown headcount or unknown contact stays unknown. No guessed emails.

### UI scout

**Sources:** public product sites.

**Answer shape, one row per reference:**

- OpsConcierge screen (route)
- Reference URL
- Pattern
- What to borrow
- What to leave

### Competitor analyst

**Sources:** the competitor’s public pricing page, product site, and docs.

**Answer shape, one row per competitor:**

- Name
- URL
- What the product does
- Plan name
- Price
- Billing unit
- Date seen
- Gap versus OpsConcierge (what they do that this product does not, and the reverse)

## Cleanup

### Delete

Submission-only files. The whole `evidence/` tree goes, including untracked P&L files.

- `docs/HACKATHON.md`
- `docs/SUBMISSION_CHECKLIST.md`
- `docs/DEVPOST_DESCRIPTION.md`
- `docs/ROADMAP_12_DAYS.md`
- `docs/RULES_SUMMARY.md`
- `evidence/`
- `src/app/api/health/xprize/route.ts`

### Edit

Remove the XPRIZE route from the public allowlist in `src/proxy.ts`.

Remove the xprize health test from `e2e/smoke.spec.ts`. Leave the other smoke tests.

Copy replacements:

| File | Change |
|---|---|
| `src/app/page.tsx` | Delete the demo-mode line “Built for Build with Gemini XPRIZE · Small Business Services”. Change “Auditable execution runs for owners and judges” to “Auditable execution runs for owners”. |
| `src/components/layout/site-footer.tsx` | Remove the Build with Gemini XPRIZE link. Keep Scope, Pricing, and Help. |
| `src/app/(dashboard)/dashboard/page.tsx` | Replace “the judge path in three clicks” with “the operator path in three clicks”. The next-step banner stays. |
| `src/components/marketing/product-demo-walkthrough.tsx` | Replace “Owners and judges use this trail…” with “Owners use this trail to trust what the AI did.” |

Strip hackathon framing and broken links from these docs. Keep the product, setup, and architecture content:

- `README.md`
- `DEPLOY.md`
- `docs/README.md`
- `docs/STRUCTURE.md`
- `docs/PROJECTS.md`
- `docs/FREE_LLM.md`
- `docs/BUSINESS_PLAN.md`
- `docs/FOUNDATION.md`
- `docs/ARCHITECTURE.md`
- `docs/GCP_AND_GEMINI_SETUP.md`
- `docs/PRODUCT_VISION.md`
- `cloud-run/ops-worker/README.md`

`docs/REAL_WORLD_USE.md` has no hackathon framing and stays as it is.

### Keep

- Support routes, hiring routes, widget, tickets, knowledge, analytics
- `GET /api/health`
- Gemini and OpenRouter routing
- Firebase evidence writes and execution-run tables
- Demo auth bypass

## Checks after implementation

- Search `src/` and `docs/` for `xprize`, `XPRIZE`, `devpost`, and `judge path`. The only allowed hit is this spec.
- `npm run typecheck`
- The landing page, footer, and dashboard no longer mention the hackathon. Support and hiring pages still render.

## Out of scope

- A competitor, pricing, UI, or customer research pass in this change
- Email or outreach
- Billing, new agent lanes, or deleting Gemini, Firebase, or execution logs
