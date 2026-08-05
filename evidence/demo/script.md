# Judge Demo Script — OpsConcierge

**Duration:** ~4 minutes (target ≤ 5 min with Q&A buffer)  
**Live URL:** https://relay-ai-app.vercel.app  
**Backup URL:** https://support-ai-nine-mu.vercel.app

**Stack proof endpoint:** `/api/health/xprize`

---

## Before you start (2 min prep, off-camera)

- [ ] Production health check: open `/api/health/xprize` — expect `readyForXprizeDemo: true`
- [ ] Incognito window or logged-in demo account ready
- [ ] Demo FAQ loaded (refund/billing questions work — see `demo/support-faq.txt`)
- [ ] Close unrelated tabs; zoom browser to 100–110%

---

## Script

### 0:00 — Hook (15 sec)

> "OpsConcierge is an AI concierge for business operations — not a generic chatbot. It runs customer support and hiring from one workspace, powered by Gemini, with an auditable execution log."

**Show:** Landing `/` — hero: "The AI concierge that runs your business operations"

---

### 0:15 — Enter the product (20 sec)

**Click:** "Open live demo" → `/dashboard`

> "This is the command center. Same product a small business owner would use daily."

**Optional:** Point to sidebar modules (Dashboard, Knowledge, Tickets, Recruitment).

---

### 0:35 — Support lane: widget (60 sec)

**Navigate:** Sidebar footer → **Preview embed widget** → `/widget`

> "Customers embed this bubble on their site. I'll simulate an inbound question."

**Actions:**
1. Click floating chat bubble (bottom-right)
2. Ask: *"What is your refund policy?"* or *"How do I reset my password?"*
3. Wait for streaming Gemini answer (grounded in uploaded FAQ)

> "Gemini answers from the company's uploaded documents — SOPs, FAQs, policies — not from thin air."

---

### 1:35 — Escalate to ticket (45 sec)

**In widget chat:**
1. Click **Escalate to ticket** (or equivalent escalation control)
2. Confirm ticket creation message

**Navigate:** `/tickets` (optional) — show new ticket

> "When AI can't finish the job, OpsConcierge creates a ticket for a human — the handoff is part of the workflow, not an afterthought."

---

### 2:20 — Execution log — judge money shot (60 sec)

**Navigate:** Sidebar → **Widget intake demo** → `/widget/intake`

> "Every widget run leaves an audit trail: lane routing, Gemini model, latency, and the decision."

**Show:**
- Run selector (latest widget intake run)
- Execution log table columns: agent, trigger, **model**, decision, latencyMs
- Click **Open selected run** → `/widget/intake/[runId]` if time allows

> "This is what owners — and judges — need: proof the AI actually ran in production."

---

### 3:20 — Google Cloud evidence (30 sec)

**Option A (live):** Firebase console → RTDB node for latest run  
**Option B (screenshot):** `evidence/screenshots/06-firebase-rtdb.png`

> "Runs also mirror to Firebase Realtime Database — our Google Cloud evidence layer."

**Optional quick show:** `/api/health/xprize` JSON — `gemini.configured` + `googleCloudEvidence`

---

### 3:50 — Hiring lane teaser (20 sec)

**Navigate:** `/recruitment`

> "Support is lane one. Hiring is lane two — resume scoring and interview prep in the same concierge, sharing company memory."

*(Skip if over time.)*

---

### 4:10 — Close (15 sec)

> "OpsConcierge: Gemini in production, Firebase evidence, deployed on Vercel with Neon — one AI concierge for the ops work that repeats every week. Live at relay-ai-app.vercel.app."

---

## Fallback lines

| Issue | Say + do |
|-------|----------|
| Widget empty / no docs | "Let me use the seeded demo workspace…" → re-seed or switch org |
| Gemini slow | "Streaming from Gemini API…" — wait; don't switch to fallback mid-demo |
| Empty `/widget/intake` | Run widget flow first; page says "Send a message via the embedded widget, then escalate" |
| Auth wall | Use demo mode env or pre-open authenticated session |

---

## Post-demo Q&A cheatsheet

| Question | Short answer |
|----------|--------------|
| Why Gemini? | Production LLM on customer widget path; logged per run |
| Why Firebase? | GCP evidence store for agent runs; health endpoint verifies |
| Multi-tenant? | Yes — org-scoped data in Neon Postgres |
| vs ChatGPT? | RAG over *your* docs + tickets + audit logs |
| Security? | Clerk auth, widget keys, no secrets in client |

---

## Recording tips

- 1920×1080 or 1440×900 window, light mode
- Mouse moves deliberate; pause 2 sec on execution log table
- Export to `evidence/demo/recording.mp4` or unlisted Loom
