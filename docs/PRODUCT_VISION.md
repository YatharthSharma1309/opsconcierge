# OpsConcierge — Product Vision

**Brand:** OpsConcierge  
**Codebase:** `OpsConcierge-App` (package: `opsconcierge`; formerly Relay AI)  
**Live:** https://relay-ai-app.vercel.app · https://support-ai-nine-mu.vercel.app

## What it is

OpsConcierge is an AI concierge for small and mid-size business operations. It captures inbound requests, answers from company knowledge, routes work to the right agent lane, updates tickets, and leaves an auditable execution trail — not a generic chatbot demo.

## Who it's for

| Segment | Pain | OpsConcierge value |
|---------|------|-------------------|
| **SMB owners / ops leads** | Support and hiring eat the same limited hours | One workspace for customer intake + hiring pipeline |
| **Support teams** | Repeat questions, slow escalation, no audit trail | RAG answers, ticket handoff, execution logs |
| **Hiring managers** | Resume triage and interview prep are manual | AI match scoring, questions, pipeline in the same product |

**ICP (initial):** 5–50 person teams with a public website, a help/FAQ backlog, and occasional hiring — not enterprise IT departments.

## Two agent lanes

### 1. Support concierge

**Path:** Widget embed → RAG answer (Gemini) → escalate to ticket → execution log

- Upload SOPs, FAQs, policies to a shared knowledge base
- Embeddable floating widget for customer sites
- Streaming chat backed by **Gemini** in production
- Ticket creation on escalation
- **Widget intake demo** at `/widget/intake` — screenshot-friendly audit rows

### 2. Hiring concierge

**Path:** Job post → resume upload → AI match score → interview questions → pipeline

- Same org memory and dashboard as support
- Shows OpsConcierge is ops-wide, not support-only

## XPRIZE narrative

**Hackathon:** Build with Gemini XPRIZE — **$2,000,000** in prizes · managed by Devpost · [xprize.devpost.com](https://xprize.devpost.com)  
**Deadline:** 18 Aug 2026 @ 1:30 AM GMT+5:30 (17 Aug · 1:00 PM PT)  
**Category:** Small Business Services  

OpsConcierge demonstrates **real business operations automated with Google AI**:

1. **Gemini API** — production LLM on the hero widget/chat path (not a stub)
2. **Firebase Realtime Database** — Google Cloud evidence of agent runs
3. **Vercel + Neon** — deployed SaaS with persistent multi-tenant data

**Judge story (60 seconds):** A customer asks the embedded widget a billing question → Gemini answers from uploaded FAQ → user escalates → ticket is created → owner opens `/widget/intake` and shows lane routing, model, latency, and decision in the execution log → optional Firebase RTDB mirror for GCP proof.

See [`docs/HACKATHON.md`](./HACKATHON.md) for prizes, eligibility, and Devpost form requirements (users + revenue evidence).

## Success criteria (demo-ready)

- [ ] Live URL loads landing + demo dashboard without friction
- [ ] Widget chat returns a cited Gemini answer from seeded FAQ
- [ ] Escalation creates a ticket and an execution run
- [ ] `/api/health/xprize` returns `readyForXprizeDemo: true`
- [ ] Evidence folder has screenshots + public &lt;3 min video
- [ ] Devpost project started; category + business evidence fields drafted

## Related docs

- `docs/HACKATHON.md` — contest brief
- `README.md` — setup and stack
- `docs/ROADMAP_12_DAYS.md` — submission timeline
- `evidence/demo/script.md` — timed judge walkthrough
