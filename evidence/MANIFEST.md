# Evidence manifest

Capture date target: 14–17 August 2026  
Live demo: https://support-ai-nine-mu.vercel.app  
Repo: https://github.com/YatharthSharma1309/opsconcierge

## Video

| Item | Status |
|------|--------|
| Public video URL (YouTube / Vimeo / Youku) | **Pending user record + upload** |
| Local file `evidence/demo/recording.mp4` | Gitignored; optional backup |
| Script | `evidence/demo/script.md` (under 3 minutes) |

## Screenshots (`evidence/screenshots/`)

| File | What | Status |
|------|------|--------|
| `01-landing.png` | Hero + XPRIZE line | Captured 14 Aug 2026 |
| `02-widget-chat.png` | Widget after grounded Gemini refund answer | Captured 14 Aug 2026 |
| `03-ticket.png` | Escalation + operator brief | Captured 14 Aug 2026 |
| `04-execution-log.png` | `/widget/intake` storyboard (`gemini_success`) | Captured 14 Aug 2026 |
| `05-health-xprize.png` | `/api/health/xprize` JSON `readyForXprizeDemo: true` | Captured 14 Aug 2026 |
| `06-firebase-rtdb.png` | RTDB `opsconcierge_agent_runs` `gemini_success` row | Captured 14 Aug 2026 — **crop the Google account chip before public upload** |
| `07-recruitment.png` | Optional candidate evidence | Optional |
| `08-vercel-deploy.png` | Optional Vercel production deploy | Optional |

Redact emails, API keys, and account IDs.

## Business evidence

| File | Status |
|------|--------|
| `customers/revenue-draft.md` | Honest **$0** draft |
| `customers/pnl-draft.md` | Honest **$0** P&L |
| `customers/outreach-list.md` | Template + 5-line pitch (no invented contacts) |
| `customers/testimonials.md` | None approved |

## Stack proof

| Check | Expected |
|-------|----------|
| Gemini in deployed app | Widget refund FAQ used `gemini-3.5-flash`; health `gemini.configured: true`; AI Runs `gemini_success` |
| Google Cloud product | Firebase RTDB write on `gemini_success` (`opsconcierge-xprize` / `opsconcierge_agent_runs`) |
| Health | `readyForXprizeDemo: true` (`gemini.model`: `gemini-3.5-flash`, `googleCloudEvidence.provider`: `firebase_rtdb`) |

## User-only before Devpost submit

1. Record and publish the video; paste URL here
2. Real outreach rows (optional but needed for viability)
3. Share GitHub with `testing@devpost.com` and `judging@hacker.fund` if the repo is private
4. Confirm Devpost category **Small Business Services**
5. Paste `docs/DEVPOST_DESCRIPTION.md` into the form
