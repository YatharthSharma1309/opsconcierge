# Submission Evidence — OpsConcierge

How to collect, name, and store proof for the Gemini XPRIZE / judge demo.

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
| **Health check** | `/api/health/xprize` JSON | `screenshots/05-*` |
| **Video** | 2–3 min demo | `demo/recording.mp4` or Loom/Drive link |
| **Customers** | Real outreach + quotes only | `customers/` |

---

## Capture workflow

1. **Prepare production** — Vercel env vars set; run demo seed if needed
2. **Verify health** — `curl https://relay-ai-app.vercel.app/api/health/xprize`
3. **Run script** — Follow `demo/script.md` once without recording (fix issues)
4. **Screenshot each stop** — Use consistent browser width (1440px recommended)
5. **Record video** — Second pass with narration or captions
6. **Redact** — Crop out personal email, internal IDs if sharing publicly

---

## Naming conventions

- Screenshots: `NN-short-description.png` (zero-padded order)
- Video: `demo/recording-YYYY-MM-DD.mp4` if multiple takes
- Keep a `evidence/MANIFEST.md` optional note listing files + capture date

---

## Submission assembly

Before Aug 17, 2026 1 PM PDT:

1. [ ] All items in `docs/SUBMISSION_CHECKLIST.md`
2. [ ] Video uploaded (repo or external link judges can open)
3. [ ] Screenshot folder zipped or linked
4. [ ] No fabricated testimonials — placeholders OK until real quotes exist

---

## Related

- `docs/SUBMISSION_CHECKLIST.md` — master checklist
- `docs/ROADMAP_12_DAYS.md` — when to capture each item
- `DEPLOY.md` — production env vars
