# 12-Day Roadmap — Aug 5 → Aug 17/18, 2026

**Hackathon:** [Build with Gemini XPRIZE](https://xprize.devpost.com) — $2M · Devpost  
**Deadline:** **18 Aug 2026 @ 1:30 AM GMT+5:30** (17 Aug 2026 · 1:00 PM PT)  
**Goal:** Demo-ready Devpost submission — live URL, Gemini + GCP proof, &lt;3 min video, users/revenue evidence.

Assumes the app already runs locally with Neon + seeded demo data. Focus is polish, deploy verification, business evidence, and judge narrative — not greenfield features.

Full brief: [`docs/HACKATHON.md`](./HACKATHON.md)

---

## Week 1 — Stack proof + demo path (Aug 5–10)

### Aug 5 (Tue) — Baseline
- [ ] Confirm local `npm run dev` + `npm run db:seed` works
- [ ] Set `GEMINI_API_KEY`, `FIREBASE_DATABASE_URL` in `.env.local`
- [ ] Hit `/api/health/xprize` — note gaps in `nextSteps`
- [ ] Run one full judge path manually (see `evidence/demo/script.md`)
- [ ] Open Devpost: Join / Start project / Import from portfolio if needed

### Aug 6 (Wed) — Gemini path
- [ ] Verify widget chat streams via Gemini (not fallback-only)
- [ ] Confirm execution log rows show model name + latency
- [ ] Fix any broken RAG / empty-knowledge UX on `/widget`

### Aug 7 (Thu) — Firebase evidence
- [ ] Enable Firebase RTDB (test rules OK for demo)
- [ ] Confirm agent runs write to RTDB (or ops-worker path)
- [ ] Screenshot Firebase console node for `evidence/screenshots/`

### Aug 8 (Fri) — Production deploy
- [ ] Vercel env vars: `DATABASE_URL`, Clerk, `GEMINI_*`, `FIREBASE_*`, `APP_URL`
- [ ] Run migrations on production Neon branch
- [ ] Seed demo org (`POST /api/demo/seed` if configured)
- [ ] Verify https://relay-ai-app.vercel.app end-to-end

### Aug 9 (Sat) — Demo mode
- [ ] Enable public demo (`NEXT_PUBLIC_PUBLIC_DEMO_MODE=true` or auth bypass for judges)
- [ ] Landing CTAs → `/dashboard`, module pills work
- [ ] Sidebar links: `/widget`, `/widget/intake` reachable without confusion

### Aug 10 (Sun) — Buffer / bugs
- [ ] Fix top 3 UX blockers found in dry run
- [ ] Empty states on `/widget/intake` — clear CTA to `/widget`
- [ ] Mobile smoke test on landing + widget bubble

---

## Week 2 — Evidence + submission (Aug 11–17)

### Aug 11 (Mon) — Screenshots
- [ ] Landing hero (Gemini + ops workflow callouts)
- [ ] Widget chat with FAQ answer
- [ ] Ticket after escalation
- [ ] Execution log table at `/widget/intake`
- [ ] `/api/health/xprize` JSON (redact nothing sensitive — endpoint is safe)
- [ ] Optional: Firebase console, Neon dashboard, Vercel deploy

### Aug 12 (Tue) — Video
- [ ] Record 2–3 min screen capture following `evidence/demo/script.md`
- [ ] Export to `evidence/demo/recording.mp4` (or linked Drive/Loom)
- [ ] Add voiceover or on-screen captions for judge context

### Aug 13 (Wed) — Docs pass
- [ ] Finish `docs/SUBMISSION_CHECKLIST.md` items
- [ ] Update README live URL + judge path if changed
- [ ] Lean `docs/BUSINESS_PLAN.md` review (problem/solution/ICP)

### Aug 14 (Thu) — Customer / revenue evidence
- [ ] Fill `evidence/customers/outreach-list.md` with real targets (no fake names)
- [ ] Draft Devpost revenue / cost / user fields (even if early — disclose zeros honestly)
- [ ] 1–2 design-partner quotes in `evidence/customers/testimonials.md` if available
- [ ] Otherwise mark as "pending" — do not invent testimonials

### Aug 15 (Fri) — Rehearsal
- [ ] Timed demo video **&lt; 3 minutes** (judges not required past 3 min)
- [ ] Second device / incognito run (no cached auth surprises)
- [ ] Backup: local `npm run dev` + tunnel if Vercel fails

### Aug 16 (Sat) — Pre-submit
- [ ] Re-run `/api/health/xprize` on production
- [ ] Upload public YouTube/Vimeo/Youku link
- [ ] Complete Devpost draft: category, description, repo, revenue/user evidence
- [ ] Zip or link evidence screenshots

### Aug 17 (Sun) — Submit before deadline
- [ ] Final production smoke test (morning IST / early PT)
- [ ] Submit on https://xprize.devpost.com **before 18 Aug 2026 1:30 AM IST** (17 Aug 1:00 PM PT)
- [ ] Post-submit: note any judge feedback gaps for portfolio

---

## Out of scope (unless time remains)

- New agent lanes beyond support + hiring
- Billing / Stripe integration
- Mobile native apps
- Large refactors or rebranding beyond OpsConcierge copy already in app

## Daily standup (30 sec)

1. Is production demo path green?
2. Is `/api/health/xprize` green?
3. What evidence did I add yesterday?
