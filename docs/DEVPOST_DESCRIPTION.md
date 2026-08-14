# Devpost description — OpsConcierge

Paste into the Build with Gemini XPRIZE submission form. Category: **Small Business Services**. Word count is in the 500–1000 range.

**Live demo:** https://support-ai-nine-mu.vercel.app  
**Repo:** https://github.com/YatharthSharma1309/opsconcierge  
**Health:** https://support-ai-nine-mu.vercel.app/api/health/xprize

---

## Narrative (paste)

OpsConcierge is an ops desk for 5–50 person businesses that still run support and hiring from email, DMs, and a spreadsheet. The founder is usually the person answering “what is your refund policy?” at 11pm and later ranking resume PDFs with no rubric. We built one workspace that keeps company memory (FAQs, policies, job criteria) and two human-controlled lanes: website support and hiring.

**How AI works day to day.** A visitor asks a question on the embeddable widget. The app retrieves from that company’s documents (keyword today; embeddings when configured), then Gemini generates a grounded answer with sources and a confidence score. If the visitor still wants a human, they escalate with an email. The ticket includes the full transcript. Gemini then writes an operator brief: priority, category, reason code, and three next actions. The same run is stored as an execution log in Postgres and, on Gemini success, posted to Firebase Realtime Database as Google Cloud evidence. Hiring is a second lane: resumes are parsed, evidence is extracted, a deterministic match score is calculated, and the founder still shortlists or rejects. We do not auto-hire or auto-reject.

**What humans do versus what AI does.** AI interprets policies, drafts answers, classifies escalations, and prepares resume evidence. Humans own the consequential decisions: talking to the customer, changing a refund, posting the job, and making the hire. That split is deliberate. Customers expect a human path when GenAI is in the loop, and founders will not trust a bot that fires people or hides how it decided.

**Jobs and economic opportunity beyond the founding team.** The product is meant to give a small operator the same “ops desk” a larger company buys from Intercom plus a lightweight recruiter inbox. Time saved on repeat FAQs is time the founder can spend on fulfillment, sales, or actually interviewing. If the business grows, the audit trail (who asked what, what the model said, why it escalated) is what a first support hire or ops contractor inherits — not a pile of undocumented DMs. Hiring shortlists are designed so a founder can hire a real person faster, not so AI can replace that person.

**Category impact (Small Business Services).** We are not claiming 90% autonomous support. The wedge is routine FAQ deflection plus a clean human handoff, then a learning loop: escalations become knowledge gaps, and an operator can draft an FAQ back into the knowledge base. That is how a bot does not get abandoned after 30 days. Pricing is a simple Pro desk ($29–49/mo in the plan), not a per-resolution tax.

**Build story and disclosure.** The codebase started as a support/RAG app (historically Relay AI / SupportAI). During the May–August 2026 window we rebranded to OpsConcierge, added Gemini-first support with OpenRouter fallback, Firebase RTDB evidence, widget intake storyboards, escalation triage, and a hiring lane. Boilerplate (Next.js, Prisma, Clerk, Neon) is disclosed as pre-existing scaffolding. The live public host is a **portfolio demo** with sample FAQ, tickets, and candidates so judges can walk the path without a login. Seeded demo data is labeled as demo and is **not** customer traction.

**Business viability (honest).** As of 14 August 2026 there are **no arms-length paying customers and $0 revenue**. Marketing and customer-acquisition spend during the hackathon is **$0**. Related-party revenue is also $0. We are not inventing users, logos, or testimonials. The live product, Gemini production path, Google Cloud evidence, and demo workspace are the current proof. Design-partner outreach is the next human step; any later payment would be reported as Total Revenue by month on Devpost.

**Stack for judges.** Gemini API in the deployed widget/chat path. Firebase Realtime Database for agent-run evidence. Neon Postgres for tickets, runs, and knowledge. Vercel for hosting. OpenRouter is a fallback LLM and powers recruitment analysis today — we do not claim Gemini scores resumes.

**Judge path (under three minutes).** Landing → dashboard (Gemini path visible) → widget FAQ with citations → escalate to ticket → operator brief → `/widget/intake` AI run (model, latency, decision) → optional hiring candidate evidence.

---

## Short blurb / tagline options

- AI ops desk for small businesses: grounded FAQ answers, human escalation, evidence-backed hiring.
- Gemini answers from your policies. Humans own the messy cases. Every support run is auditable.

## Devpost field cheat sheet

| Field | Paste |
|-------|--------|
| Project name | OpsConcierge |
| Category | Small Business Services |
| Tagline | AI ops desk for SMBs: grounded FAQs, human escalation, evidence-backed hiring |
| Demo URL | https://support-ai-nine-mu.vercel.app |
| Repo | https://github.com/YatharthSharma1309/opsconcierge |
| Built with | Gemini API, Firebase Realtime Database, Neon Postgres, Vercel, Next.js |
| Total revenue | 0 |
| Revenue by month | May $0, June $0, July $0, August $0 |
| Total costs | 0 |
| Marketing / CAC | 0 |
| Related-party revenue | 0 |
| Users | Demo workspace only — not claimed as customers |
| Video | *user records — under 3 minutes, public* |
