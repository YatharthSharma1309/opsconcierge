# Submission evidence — OpsConcierge

How to collect, name, and store proof for Build with Gemini XPRIZE / judge demos.

**Do not commit secrets** (API keys, Firebase service accounts, full `.env` files).

---

## Folder layout

```
evidence/
├── README.md                 ← this file
├── demo/
│   ├── script.md             ← timed judge walkthrough
│   └── recording.mp4         ← screen capture (add when ready)
├── screenshots/
│   ├── 01-landing.png
│   ├── 02-widget-chat.png
│   ├── 03-ticket.png
│   ├── 04-execution-log.png
│   ├── 05-health-xprize.png
│   └── 06-firebase-rtdb.png
└── customers/
    ├── outreach-list.md
    └── testimonials.md
```

Create `screenshots/` when you capture images. Git-ignore large binaries if needed (`.mp4`).

---

## What to collect

| Category | What | Where to store |
|----------|------|----------------|
| **Live app** | Production URL works | Note in submission form |
| **Gemini** | Chat response + log `model` column | `screenshots/02-*`, `04-*` |
| **Firebase** | RTDB node after a widget run | `screenshots/06-*` |
| **Execution log** | `/widget/intake` run detail | `screenshots/04-*` |
| **Health check** | `/api/health/xprize` JSON | `screenshots/05-*` |
| **Video** | 2–3 min demo | `demo/recording.mp4` or Loom/Drive link |
| **Customers** | Real outreach + quotes only | `customers/` |

---

## Capture workflow

1. **Prepare production** — Vercel env set; run demo seed if needed ([DEPLOY.md](../DEPLOY.md))
2. **Verify health** — `curl https://support-ai-nine-mu.vercel.app/api/health` (and `/api/health/xprize` after OpsConcierge redeploy)
3. **Run script** — Follow [`demo/script.md`](./demo/script.md) once without recording
4. **Screenshot each stop** — Consistent browser width (1440px recommended)
5. **Record video** — Second pass with narration or captions
6. **Redact** — Crop personal email / internal IDs before public share

---

## Naming conventions

- Screenshots: `NN-short-description.png` (zero-padded order)
- Video: `demo/recording-YYYY-MM-DD.mp4` if multiple takes
- Optional: `evidence/MANIFEST.md` listing files + capture date

---

## Submission assembly

Before **17 Aug 2026 1:00 PM PT** (18 Aug 2026 1:30 AM GMT+5:30):

1. [ ] Items in [`docs/SUBMISSION_CHECKLIST.md`](../docs/SUBMISSION_CHECKLIST.md)
2. [ ] Video uploaded (repo or external link judges can open)
3. [ ] Screenshot folder zipped or linked
4. [ ] No fabricated testimonials — placeholders OK until real quotes exist

---

## Related

- [`docs/SUBMISSION_CHECKLIST.md`](../docs/SUBMISSION_CHECKLIST.md) — master checklist
- [`docs/ROADMAP_12_DAYS.md`](../docs/ROADMAP_12_DAYS.md) — when to capture each item
- [`DEPLOY.md`](../DEPLOY.md) — production env vars
- [`../README.md`](../README.md) — product overview + local quick start
