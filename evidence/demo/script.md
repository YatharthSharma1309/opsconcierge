# Judge Demo Script — OpsConcierge

**Duration:** ~3–4 minutes (≤ 3 min for Devpost video cut)  
**Live URL:** https://support-ai-nine-mu.vercel.app  
**Protected (skip for judges):** https://relay-ai-app.vercel.app  
**Persona:** PipelineKit (B2B SaaS, ~20 people) — see `docs/REAL_WORLD_USE.md`

**Stack proof:** `GET /api/health` now · `GET /api/health/xprize` after redeploying OpsConcierge to the public host.  
**Brand note:** Public shell may still say Relay AI until redeploy; codebase/repo is OpsConcierge.

---

## Before you start

- [ ] Health check shows Gemini path ready for XPRIZE (or note OpenRouter demo)
- [ ] Knowledge includes `demo/support-faq.txt` (password, billing, refunds, API limits)
- [ ] Incognito / demo mode ready

---

## Script

### 0:00 — Hook (15s)

> "Meet PipelineKit — a 20-person SaaS. The founder still answers password and billing questions every week. OpsConcierge is their ops desk: website FAQ deflection, clean escalation, and a resume inbox when they hire."

**Show:** Landing `/`

---

### 0:15 — Command center (20s)

**Click:** Open live demo → `/dashboard`

> "This is what the founder opens daily — knowledge, tickets, chat — not a 50-agent call center."

---

### 0:35 — Real FAQ on the widget (60s)

**Go to:** `/widget` → open bubble

**Ask (pick one):**
- "How do I reset my password if we use SSO?"
- "What happens if my card fails?"
- "What are the API rate limits on Pro?"

> "Answers come from their uploaded FAQ — the same docs they already had in Notion — not generic ChatGPT."

---

### 1:35 — Escalate like a real customer (40s)

> "Customers want a human when AI is involved. We never trap them."

**Click:** Escalate to ticket

> "The ticket gets the full transcript so the human doesn't make them repeat themselves."

---

### 2:15 — Execution log (40s)

**Go to:** `/widget/intake`

> "Owners see lane routing, model, latency, and deflect vs escalate — then fix the FAQ from what failed. That's how bots don't get abandoned after 30 days."

---

### 2:55 — Hiring lane teaser (30s, optional)

**Go to:** `/recruitment`

> "Same workspace shortlists support-hire resumes. Founder still posts on Indeed — we rank PDFs with evidence, no auto-reject."

---

### 3:25 — Close (20s)

> "Small Business Services: real ops for real SMBs — Gemini in production, Google Cloud evidence, auditable runs."

**Show:** `/api/health/xprize` JSON briefly if time.

---

## Fallback if Gemini quota is zero

Use OpenRouter free path; say: "Same workflow; Gemini enabled for contest compliance when free quota is available." Still show escalate + execution log.
