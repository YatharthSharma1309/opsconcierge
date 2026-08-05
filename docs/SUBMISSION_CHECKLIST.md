# XPRIZE / Judge Submission Checklist

**Hackathon:** [Build with Gemini XPRIZE](https://xprize.devpost.com) — $2,000,000 · Managed by Devpost  
**Product:** OpsConcierge  
**Deadline:** **18 Aug 2026 @ 1:30 AM GMT+5:30** (17 Aug 2026 · 1:00 PM PT) · ~12 days from 5 Aug  
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
| Tagline / blurb | Build with Gemini — AI ops for SMBs | [ ] |

---

## Required links

| Item | Value | Done |
|------|-------|------|
| Primary live URL | https://relay-ai-app.vercel.app | [ ] |
| Legacy alias | https://support-ai-nine-mu.vercel.app | [ ] |
| GitHub | `YatharthSharma1309/opsconcierge` (legacy: `relay-ai`) | [ ] |
| Demo video (&lt; 3 min, public) | YouTube / Vimeo / Youku link | [ ] |

---

## Mandatory stack evidence

| Stack piece | How to prove | Done |
|-------------|--------------|------|
| **Gemini API** | Widget/chat response; execution log `model` column; `/api/health/xprize` → `gemini.configured: true` | [ ] |
| **Firebase RTDB** | Firebase console screenshot; `/api/health/xprize` → `googleCloudEvidence.provider: "firebase_rtdb"` | [ ] |
| **Vercel** | Production URL loads; Vercel dashboard deploy screenshot | [ ] |
| **Neon Postgres** | Tickets, execution runs persist after refresh; optional Neon console screenshot | [ ] |

**Health endpoint:** `GET /api/health/xprize`  
Target response: `"readyForXprizeDemo": true`

---

## Judge demo path (must work live)

1. [ ] Landing `/` — hero mentions Gemini + ops workflow
2. [ ] Enter app → `/dashboard` (demo mode or sign-in)
3. [ ] `/widget` — open floating bubble, ask FAQ question (e.g. refund policy)
4. [ ] Gemini streams an answer grounded in knowledge base
5. [ ] **Escalate to ticket** — ticket created
6. [ ] `/widget/intake` — execution log shows run with agent, model, latency, decision
7. [ ] Optional: `/widget/intake/[runId]` — deep link to specific run
8. [ ] Optional: `/recruitment` — second agent lane (30 sec)

Script: `evidence/demo/script.md`

---

## Screenshots to capture

Store under `evidence/screenshots/` (create subfolders as needed).

| # | Screen | Filename (suggested) | Done |
|---|--------|----------------------|------|
| 1 | Landing hero | `01-landing.png` | [ ] |
| 2 | Widget chat + answer | `02-widget-chat.png` | [ ] |
| 3 | Ticket / escalation | `03-ticket.png` | [ ] |
| 4 | Execution log table | `04-execution-log.png` | [ ] |
| 5 | XPRIZE health JSON | `05-health-xprize.png` | [ ] |
| 6 | Firebase RTDB node | `06-firebase-rtdb.png` | [ ] |
| 7 | Recruitment lane (optional) | `07-recruitment.png` | [ ] |

---

## Written materials

| Doc | Path | Done |
|-----|------|------|
| Product vision | `docs/PRODUCT_VISION.md` | [ ] |
| Business plan (lean) | `docs/BUSINESS_PLAN.md` | [ ] |
| Demo script | `evidence/demo/script.md` | [ ] |
| README (setup + stack) | `README.md` | [ ] |

---

## Environment (production)

Verify in Vercel project settings:

- [ ] `DATABASE_URL` (Neon pooled)
- [ ] `GEMINI_API_KEY` + `GEMINI_CHAT_MODEL`
- [ ] `FIREBASE_DATABASE_URL`
- [ ] `APP_URL` = primary Vercel URL
- [ ] Clerk keys (or public demo mode flags)
- [ ] `DEMO_SEED_SECRET` if using demo seed endpoint

---

## Pre-submit smoke test (15 min)

```bash
# Production health
curl -s https://relay-ai-app.vercel.app/api/health/xprize | jq
```

- [ ] `readyForXprizeDemo` is `true`
- [ ] Full demo script completed once on production
- [ ] Video link works for judges (not private-only)
- [ ] No secrets in screenshots or committed files

---

## Business evidence (required on Devpost)

| Field | Notes | Done |
|-------|-------|------|
| Total revenue (USD, arms-length) | May–Aug 2026 window | [ ] |
| Revenue by month | May / June / July / August 2026 | [ ] |
| Total costs | Hosting, AI APIs, contractors — one-sentence description | [ ] |
| Marketing / CAC spend | Disclose even if $0 | [ ] |
| Related-party revenue | Separate from arms-length total | [ ] |
| Real users | Count + who they are; testimonials if any (with consent) | [ ] |
| Production evidence | Agent logs, API usage, dashboard screenshots | [ ] |

---

## Submission packet (assemble)

1. Live demo URL + testing instructions (login if needed)
2. Public video **under 3 minutes**
3. Repo URL + category + text description (Gemini + GCP + business story)
4. Revenue / cost / user evidence fields
5. Screenshots: widget, ticket, `/widget/intake`, Firebase, health JSON
6. Blurb from `docs/BUSINESS_PLAN.md`

**Eligibility reminder:** age of majority; excluded countries/territories — see full rules.
