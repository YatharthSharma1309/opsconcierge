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
| `01-landing.png` | Hero + XPRIZE line | Capture after deploy |
| `02-widget-chat.png` | Grounded Gemini answer + sources | Capture after live widget turn |
| `03-ticket.png` | Escalation + operator brief | Capture after escalate |
| `04-execution-log.png` | `/widget/intake` storyboard | Capture after Gemini run |
| `05-health-xprize.png` | `/api/health/xprize` JSON | Capture when `readyForXprizeDemo: true` |
| `06-firebase-rtdb.png` | RTDB `opsconcierge_agent_runs` node | Capture after `gemini_success` |
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
| Gemini in deployed app | Widget/chat uses Gemini when quota works; health `gemini.configured: true` |
| Google Cloud product | Firebase RTDB writes on `gemini_success` (`opsconcierge-xprize`, test-mode rules through mid-Sep 2026) |
| Health | `readyForXprizeDemo: true` after `FIREBASE_DATABASE_URL` is set and production is redeployed |

## User-only before Devpost submit

1. Record and publish the video; paste URL here
2. Real outreach rows (optional but needed for viability)
3. Share GitHub with `testing@devpost.com` and `judging@hacker.fund` if the repo is private
4. Confirm Devpost category **Small Business Services**
5. Paste `docs/DEVPOST_DESCRIPTION.md` into the form
