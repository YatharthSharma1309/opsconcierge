# OpsConcierge — Lean Business Plan

Portfolio / hackathon length. Expand only if judges or investors request detail.

---

## Problem

Small businesses run support and hiring on the same limited ops bandwidth:

- Customers ask repeat questions; owners re-type the same answers
- Escalations land in email/DM with no audit trail
- Hiring adds resume triage and scheduling on top of support load
- Generic chatbots answer vaguely and cannot update tickets or show *what the AI decided*

## Solution

**OpsConcierge** — an AI concierge that runs business operations:

- **Support lane:** Embeddable widget → RAG over company docs → **Gemini** answers → escalate to ticket → execution log
- **Hiring lane:** Job posts, resume scoring, interview questions, pipeline — same workspace
- **Evidence layer:** Every run logged for owners and compliance (Postgres + Firebase RTDB)

## Target customer (ICP)

| Attribute | Detail |
|-----------|--------|
| **Size** | 5–50 employees |
| **Profile** | SaaS, agencies, e-commerce, local services with a website |
| **Trigger** | Support volume or hiring sprint overwhelming the founder |
| **Buyer** | Founder, ops lead, or head of support |

**Not targeting (v1):** Enterprise ITSM replacements, call centers, or regulated industries requiring on-prem.

## Value proposition

> One AI concierge for the ops work that repeats every week — customer intake and hiring — with answers grounded in *your* documents and a log of every AI decision.

## Business model (lite)

| Tier | Price | Includes |
|------|-------|----------|
| Free | $0 | 1 workspace, watermarked logs, basic widget |
| Pro | $29–49/mo | Multiple agents, analytics, custom workflows |
| Enterprise | Custom | SSO, private deploy, API, audit exports |

Revenue drivers: seat/workflow expansion, higher message limits, recruitment module add-on.

## Go-to-market (90 days)

1. **Demo-first** — Live URL on portfolio + XPRIZE submission
2. **Design partners** — 3–5 SMBs (see `evidence/customers/outreach-list.md`)
3. **Content** — "AI concierge vs chatbot" posts, Loom demos, FAQ upload guide
4. **Channels** — Founder networks, indie SaaS communities, local business groups
5. **Proof** — Testimonials and ticket-deflection metrics from pilots (real quotes only)

## Competition (honest)

| Alternative | Gap OpsConcierge fills |
|-------------|------------------------|
| Intercom / Zendesk AI | Heavy, expensive; weak hiring lane |
| Raw ChatGPT | No RAG, tickets, or audit logs |
| Point HR tools | No shared company memory with support |

**Moat (early):** Unified ops memory + auditable Gemini runs + fast embed for SMBs.

## Traction (fill with real numbers)

| Metric | Current | Target (90d) |
|--------|---------|--------------|
| Live demo URL | ✅ | Maintain uptime |
| Design partner conversations | _[count]_ | 5 |
| Widget conversations / week | _[count]_ | 50+ |
| Ticket deflection rate | _[%]_ | Measure in analytics |

## Team

_[Your name]_ — full-stack builder; product, Next.js, AI integration, deploy.

## Ask (context-dependent)

- **XPRIZE:** Recognition + validation of Gemini + GCP stack for ops automation
- **Pilot customers:** 30-day free Pro for feedback + testimonial
- **Future:** Pre-seed only after 3+ paying SMBs (not required for hackathon submit)

## Risks

| Risk | Mitigation |
|------|------------|
| LLM hallucination | RAG + cite sources + escalate path |
| Demo fragility | Health endpoint, seeded FAQ, rehearsal script |
| SMB churn | Start with narrow ICP and onboarding checklist |

---

**Live demo:** https://relay-ai-app.vercel.app  
**Docs:** `docs/PRODUCT_VISION.md` · `evidence/demo/script.md`
