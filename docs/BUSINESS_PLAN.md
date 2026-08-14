# OpsConcierge — Lean Business Plan

Grounded in real SMB support/hiring behavior. Portfolio / XPRIZE length.

---

## Problem (observed in the market)

Founders of 5–50 person companies still run ops from **email + DMs + a spreadsheet**:

- **Support:** Same questions every week (returns, WISMO, password, hours, billing). Website chat helps only if answers stay grounded in *their* policies.
- **Handoff:** Chatbots that loop without a human path destroy trust (~87% of customers want a human option when GenAI is used — [Gartner 2026](https://www.gartner.com/en/newsroom/press-releases/2026-08-04-gartner-survey-finds-87-percent-of-customers-say-companies-using-genai-for-customer-service-must-provide-access-to-a-human-agent0)).
- **Maintenance:** AI tools die after 30 days when nobody reviews wrong answers ([SMB AI abandonment patterns](https://research.briankeefe.dev/20260319-170040-smb-ai-backlash)).
- **Hiring:** Referrals + free Indeed/LinkedIn dumps 50–200 PDFs on a founder with no rubric ([FirstHR SMB process](https://firsthr.app/blog/hiring/recruitment-process)).

## Solution

**OpsConcierge** = company memory + two lightweight lanes:

| Lane | Real job to be done |
|------|---------------------|
| **Support** | Deflect routine FAQs on the website widget; escalate with transcript; leave an execution log |
| **Hiring** | Rank resumes with evidence; draft interview questions; human confirms (no auto-hire) |

See [`REAL_WORLD_USE.md`](./REAL_WORLD_USE.md) for personas and day-to-day use.

## Target customer

| Attribute | Detail |
|-----------|--------|
| **Size** | 5–50 employees |
| **Primary** | D2C / early SaaS with a website and a messy FAQ |
| **Secondary** | Local services & tutoring (FAQ + occasional hiring) |
| **Buyer** | Founder or ops lead (still answers tickets personally) |
| **Trigger** | &gt;10 hrs/week on repeat questions **or** a hiring sprint |

**Not targeting (v1):** 50+ agent contact centers, on-prem regulated ITSM, “fire the support team” buyers.

## Value proposition

> Stop re-typing the same answers. When AI can’t help, hand off with the full story. When you’re hiring, read a ranked shortlist — not eighty resumes. Support runs are logged so your knowledge base gets better.

## Business model (lite)

| Tier | Price | Fit |
|------|-------|-----|
| Free | $0 | 1 workspace, widget, watermarked logs — design partners |
| Pro | $29–49/mo | Higher volume, analytics, hiring lane unlocked |
| Enterprise | Custom | Later (SSO, private deploy) — not the wedge |

Avoid per-resolution “gotcha” pricing that buyers hate on Intercom/Zendesk AI.

## Go-to-market (90 days)

1. **Persona-led demos** — PipelineKit (SaaS FAQ) and GlowTheory (returns FAQ) scripts  
2. **Design partners** — 3–5 real SMBs from `evidence/customers/outreach-list.md`  
3. **Wedge channel** — Website widget only (prove value before WhatsApp/IG)  
4. **Proof** — Deflection %, escalations with context, hiring hours saved (real numbers only)  
5. **XPRIZE** — Small Business Services category; Gemini + Firebase evidence  

## Competition (honest)

| Alternative | Gap we fill |
|-------------|-------------|
| Intercom / Zendesk | Cheaper ops desk + hiring lane; less admin |
| Gorgias | Works beyond Shopify; shared memory with hiring |
| Tidio / cheap bots | Tickets + execution audit, not just chat |
| ChatGPT | Org memory, escalate, log |
| Greenhouse / Lever | Too heavy; we are the founder’s resume inbox |

## Traction (fill with real numbers)

| Metric | Current | 90d target |
|--------|---------|------------|
| Live demo | ✅ public host | Keep uptime through judging |
| Design-partner talks | 0 | 5 |
| Widget sessions / week | Demo-only (not claimed as customers) | 50+ real |
| FAQ deflection (pilot) | n/a | 40–60% routine |
| Paying SMBs | **0** (honest) | ≥1 arms-length if chasing viability |

## Risks

| Risk | Mitigation |
|------|------------|
| Hallucinations | RAG + citations + mandatory escalate |
| Over-promising autonomy | Market 40–60% deflection, not 90% |
| Bot abandonment | Weekly execution-log → KB ritual |
| Hiring legal exposure | Advisory ranking only; human decision; no auto-reject |

---

**Playbook:** [`REAL_WORLD_USE.md`](./REAL_WORLD_USE.md)  
**Live:** https://support-ai-nine-mu.vercel.app · https://relay-ai-app.vercel.app (protected)
