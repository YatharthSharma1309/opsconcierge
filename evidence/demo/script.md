# Judge Demo Script — OpsConcierge (under 3 minutes)

**Live URL:** https://support-ai-nine-mu.vercel.app  
**Persona:** PipelineKit (B2B SaaS, ~20 people)  
**Stack proof:** `GET /api/health/xprize` should show `readyForXprizeDemo: true` after Firebase is set.

Do not narrate simulated RAG progress timers. The execution storyboard is the trustworthy evidence.

---

## Before you start

- [ ] Public demo mode (no sign-in)
- [ ] Knowledge includes the demo FAQ
- [ ] Incognito window, 1440px wide
- [ ] One practice pass without recording

---

## Script (~2:50)

### 0:00–0:15 — Hook

**Show:** `/`

> "Meet PipelineKit — a 20-person SaaS. The founder still answers password and billing questions every week. OpsConcierge is their ops desk: grounded FAQ answers, a human path with the full transcript, and a resume inbox when they hire."

### 0:15–0:30 — Command center

**Click:** Open live demo → `/dashboard`

> "Gemini is the primary support path, with OpenRouter as fallback. Company memory is loaded. This is what the founder opens daily — not a 50-agent call center."

Point at the AI engine card: provider, model, knowledge ready.

### 0:30–1:10 — Widget decision

**Go to:** `/widget` → open the bubble

**Ask:** "What happens if my card fails?"

> "The answer is grounded in their uploaded FAQ, with sources and a confidence score — not generic ChatGPT."

Do **not** claim the on-screen progress chips are live server events.

### 1:10–1:35 — Human escalate

> "Customers want a human when AI is involved. We never trap them."

Enter a demo email if required → **Contact support / Escalate**.

> "The ticket gets the full transcript so the human does not make them repeat themselves."

Click **Open operator brief**.

### 1:35–2:05 — Operator brief (strongest AI decision)

**Show:** ticket detail

> "Gemini classifies the case: priority, category, reason, and three next actions. The founder still talks to the customer. AI prepares; humans decide."

### 2:05–2:35 — AI Runs

**Click:** **View AI Runs** or footer **AI Runs** → `/widget/intake`

> "Lane routing, Gemini model, latency, retrieval, and escalate-or-deflect are logged in Postgres. The same Gemini success is written to Firebase Realtime Database — our Google Cloud evidence."

If time: open `/api/health/xprize` in a second tab for one second.

### 2:35–2:55 — Hiring (secondary)

**Go to:** `/recruitment` → open the demo top candidate

> "Same workspace. The score is deterministic from resume evidence. The founder still shortlists or rejects — no auto-hire."

### 2:55–3:00 — Close

> "Small Business Services: AI interprets and prepares; humans own support exceptions and hiring. Gemini in production, auditable runs."

---

## Fallback if Gemini quota is zero

Say: "Same workflow; OpenRouter is the fallback. Gemini is configured for contest compliance when quota is available." Still show escalate + operator brief + AI Runs. Do not pretend Firebase rows exist unless `gemini_success` fired.

---

## Video checklist (user records)

- [ ] Public YouTube / Vimeo / Youku, not private
- [ ] Captions or voiceover
- [ ] No secrets, no personal inbox, no `.env`
- [ ] File locally as `evidence/demo/recording.mp4` (gitignored) **or** paste URL in `evidence/MANIFEST.md`
