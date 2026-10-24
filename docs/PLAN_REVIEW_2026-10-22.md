# Plan review, noted 22 Oct 2026

An outside review of the OpsConcierge 90-day plan. Noted for the team. It does not replace [`BUSINESS_PLAN.md`](./BUSINESS_PLAN.md).

**Verdict in the review:** keep the plan, and change how it is executed. The open question is whether a 5–50 person founder will pay for support plus resume screening, and whether those people can be found in time.

## What the team should understand

1. Support stays the product a founder would open every week. Hiring stays in the same workspace as a secondary workflow. The combined offer is still unproven.
2. The first market to investigate is a small B2B SaaS company, about 5–30 people, whose founder or ops lead still answers repeat questions from existing docs. Clinics, stores, trades, and tutoring stay in the playbook. They are not the first list.
3. Customer conversations come before more features. Five talks and one real pilot matter more than another channel.
4. A founder liking both lanes is not a purchase. Ask which offer they would pay for: support only, hiring only, or both. Write the answer in the business plan.
5. Reliability of the support path comes before new product surface. The review’s extra tests are not a new feature list.
6. Competitor attention stays on Intercom, Tidio, Crisp, Chatbase, and Talivo. Each note should say what to build, avoid, or explain. Do not reopen a wide survey.
7. Deflection is not success by itself. Count answers the docs support, answers the product refuses, completed handoffs, and whether the founder comes back.
8. Spending stays inside the validation stage. Hosting, model calls, storage, and tools get a real monthly total before any new paid service.

## What is already true, so the team does not restart it

The review described an earlier draft. These facts stand as of 22 Oct 2026.

| Topic | Standing fact |
|-------|----------------|
| App | Next.js on Vercel, Neon Postgres, Clerk with a public-demo bypass, Gemini with an OpenRouter fallback. There is no FastAPI service to build. |
| Live demo | https://support-ai-nine-mu.vercel.app — production Ready 21 Oct 2026. Repo `master` is on GitHub through `b2aa18b`. |
| Support path | Walked on that demo. A refund question was labeled answered from the docs and cited the FAQ. An Austin street address was not invented. The inbox marked that thread “Waiting on you.” |
| Hiring path | Walked on `/hiring` with fictional candidates. Requirement lines show as Shown or Not shown. A denial can be marked Contradicts. No auto-reject. |
| Price | Published price is Free $0 and Pro **$39/mo**, with caps of 250 assistant answers, 40 resume screens, and 5 roles. The public demo skips the caps. |
| Model cost | Gemini 3.5 Flash rate card, 21 Oct 2026. A heavy Pro month at those caps is about $21. That is model cost only. |
| Founder talks | 0. Paying customers: 0. |
| Out of scope | AI interviews, WhatsApp, Instagram, per-resolution billing, payroll, an ATS marketplace, SSO, a second brand, auto-reject, unlimited AI. |

The review’s $5 / $4 / $2 cost sketch is an illustration, not a measurement. The $29 and $49 prices are hypotheses to ask about. They do not replace the published $39 price.

## The review’s three questions

**1. What is the current state of the application?**

**A, for the paths already walked.** Support and hiring both run on the public demo. These checks from the review are not recorded yet: a partial answer, two docs that contradict each other, a file that fails to upload, a second workspace that cannot see the first, a refresh that keeps the ticket, and a check that the cited passage actually supports the sentence.

**2. Have you spoken to any potential customers?**

**A. No conversations yet.**

**3. How much time and money is available over the next 30 days?**

Unanswered. The team does not invent hours per day, a runway number, or a funding partner.

## What this note does not authorize

- Sending the sample email, or building a list of 50 companies, until that work is asked for.
- Changing the landing price, the caps, or the ICP from this review alone.
- Removing hiring, or promoting it to an equal product.
- Treating 40–60% deflection as the success bar for a pilot.
