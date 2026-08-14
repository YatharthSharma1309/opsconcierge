# XPRIZE / Judge Submission Checklist

**Hackathon:** [Build with Gemini XPRIZE](https://xprize.devpost.com) — $2,000,000 · Managed by Devpost  
**Product:** OpsConcierge  
**Deadline:** **18 Aug 2026 @ 1:30 AM GMT+5:30** (17 Aug 2026 · 1:00 PM PT)  
**Category:** Small Business Services  
**Repo:** `OpsConcierge-App`

Full brief: [`docs/HACKATHON.md`](./HACKATHON.md). Official rules: https://www.geminixprize.com/rules

---

## Devpost form

| Item | Value / action | Done |
|------|----------------|------|
| Join / Start project | https://xprize.devpost.com | [ ] |
| Import from portfolio (optional) | Use if project already on Devpost | [ ] |
| Find teammates (optional) | Solo OK | [ ] |
| Category | **Small Business Services** | [ ] |
| Tagline / blurb | See `docs/DEVPOST_DESCRIPTION.md` | [x] draft |

---

## Required links

| Item | Value | Done |
|------|-------|------|
| Primary live URL | https://support-ai-nine-mu.vercel.app (public) | [x] |
| Protected / secondary | https://relay-ai-app.vercel.app (Vercel login wall — not for judges) | [x] skip for judges |
| GitHub | `YatharthSharma1309/opsconcierge` (legacy remote: `relay-ai`) | [x] public |
| Demo video (&lt; 3 min, public) | YouTube / Vimeo / Youku link | [ ] user records |

---

## Mandatory stack evidence

| Stack piece | How to prove | Done |
|-------------|--------------|------|
| **Gemini API** | Widget/chat response; execution log `model` column; `/api/health/xprize` → `gemini.configured: true` | [x] production `gemini-3.5-flash` + `gemini_success` |
| **Firebase RTDB** | Firebase console screenshot; `/api/health/xprize` → `googleCloudEvidence.provider: "firebase_rtdb"` | [x] `opsconcierge_agent_runs` row |
| **Vercel** | Production URL loads; Vercel dashboard deploy screenshot | [x] live URL; optional dashboard shot skipped |
| **Neon Postgres** | Tickets, execution runs persist after refresh; optional Neon console screenshot | [x] ticket + AI Runs persist |

**Health endpoint:** `GET /api/health/xprize`  
Target response: `"readyForXprizeDemo": true`

---

## Judge demo path (must work live)

1. [x] Landing `/` — hero mentions Gemini + ops workflow
2. [x] Enter app → `/dashboard` (demo mode or sign-in)
3. [x] `/widget` — open floating bubble, ask FAQ question (e.g. refund policy)
4. [x] Gemini streams an answer grounded in knowledge base
5. [x] **Escalate to ticket** — ticket created
6. [x] `/widget/intake` — execution log shows run with agent, model, latency, decision
7. [ ] Optional: `/widget/intake/[runId]` — deep link to specific run
8. [ ] Optional: `/recruitment` — second agent lane (30 sec)

Script: `evidence/demo/script.md`

---

## Screenshots to capture

Store under `evidence/screenshots/` (create subfolders as needed).

| # | Screen | Filename (suggested) | Done |
|---|--------|----------------------|------|
| 1 | Landing hero | `01-landing.png` | [x] |
| 2 | Widget chat + answer | `02-widget-chat.png` | [x] |
| 3 | Ticket / escalation | `03-ticket.png` | [x] |
| 4 | Execution log table | `04-execution-log.png` | [x] |
| 5 | XPRIZE health JSON | `05-health-xprize.png` | [x] |
| 6 | Firebase RTDB node | `06-firebase-rtdb.png` | [x] |
| 7 | Recruitment lane (optional) | `07-recruitment.png` | [ ] optional |

---

## Written materials

| Doc | Path | Done |
|-----|------|------|
| Product vision | `docs/PRODUCT_VISION.md` | [x] |
| Business plan (lean) | `docs/BUSINESS_PLAN.md` | [x] honest $0 traction |
| Demo script | `evidence/demo/script.md` | [x] under 3 min |
| README (setup + stack) | `README.md` | [x] |
| Devpost narrative | `docs/DEVPOST_DESCRIPTION.md` | [x] |
| Evidence manifest | `evidence/MANIFEST.md` | [x] |
| Revenue / P&L drafts | `evidence/customers/revenue-draft.md`, `pnl-draft.md` | [x] $0 |

---

## Environment (production)

Verify in Vercel project settings:

- [x] `DATABASE_URL` (Neon pooled)
- [x] `GEMINI_API_KEY` + `GEMINI_CHAT_MODEL`
- [x] `FIREBASE_DATABASE_URL` + `FIREBASE_RTDB_PATH` (production, redeployed)
- [x] `APP_URL` = primary Vercel URL
- [x] Clerk keys (or public demo mode flags)
- [x] `DEMO_SEED_SECRET` if using demo seed endpoint
- [x] `AI_PROVIDER_PREFERENCE=auto`

---

## Pre-submit smoke test (15 min)

```bash
# Production health
curl -s https://support-ai-nine-mu.vercel.app/api/health | jq
# After redeploy:
curl -s https://support-ai-nine-mu.vercel.app/api/health/xprize | jq
```

- [x] `readyForXprizeDemo` is `true`
- [x] Full demo script completed once on production (Gemini refund FAQ → escalate → AI Runs → Firebase)
- [ ] Video link works for judges (not private-only)
- [x] No API keys in committed files; crop the Google account chip in `06-firebase-rtdb.png` before a public Devpost upload

---

## Business evidence (required on Devpost)

| Field | Notes | Done |
|-------|-------|------|
| Total revenue (USD, arms-length) | **0** — see `evidence/customers/revenue-draft.md` | [x] draft |
| Revenue by month | All $0 May–Aug | [x] draft |
| Total costs | $0 incremental; hobby/free tiers | [x] draft |
| Marketing / CAC spend | **$0** | [x] draft |
| Related-party revenue | **$0** | [x] draft |
| Real users | Demo workspace only; not claimed as customers | [x] honest |
| Production evidence | Screenshots in `evidence/screenshots/` from a live Gemini+Firebase run | [x] |

---

## Submission packet (assemble)

1. Live demo URL + testing instructions (login if needed)
2. Public video **under 3 minutes**
3. Repo URL + category + text description (Gemini + GCP + business story)
4. Revenue / cost / user evidence fields
5. Screenshots: widget, ticket, `/widget/intake`, Firebase, health JSON
6. Blurb from `docs/BUSINESS_PLAN.md` / paste from `docs/DEVPOST_DESCRIPTION.md`

## User-only before final submit

These cannot be completed in this repo sprint:

1. Record + publish the &lt;3 min video (YouTube / Vimeo / Youku, public)
2. Real prospect outreach (no invented contacts)
3. Any arms-length payment, if it happens
4. Consented testimonials / contact details
5. Devpost account confirmation and the Submit button
6. Share GitHub with `testing@devpost.com` and `judging@hacker.fund` if the repo is private

**Eligibility reminder:** age of majority; excluded countries/territories — see full rules.
