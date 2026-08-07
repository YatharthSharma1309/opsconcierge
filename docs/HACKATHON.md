# Build with Gemini XPRIZE

**Tagline:** $2,000,000 in prizes. Build with Gemini. Ship products that impact the world.

| Field | Value |
|-------|--------|
| **Official name** | Build with Gemini XPRIZE |
| **Sponsor** | XPRIZE |
| **Administrator** | Devpost |
| **Format** | Online · Public |
| **Prize pool** | **$2,000,000** cash |
| **Participants (Devpost)** | ~23,956 (snapshot — updates on Devpost) |
| **Devpost tags** | Machine Learning/AI · Education · Productivity |
| **Submission site** | https://xprize.devpost.com |
| **Overview** | https://www.geminixprize.com |
| **Full rules** | https://www.geminixprize.com/rules |

---

## Deadline (local)

| Timezone | Deadline |
|----------|----------|
| **India (GMT+5:30)** | **18 Aug 2026 @ 1:30 AM** |
| Pacific (PT) | 17 Aug 2026 @ 1:00 PM PT |
| Days left (from ~7 Aug 2026) | **~11 days** |

**Build window:** 19 May 2026 → 17 Aug 2026 (90 days)  
**Judging:** 18 Aug 2026 → 15 Sep 2026  
**Finalist pitches:** ~25 Sep 2026 (Moonshot Summit, Los Angeles) — top projects compete for grand prizes

---

## Devpost actions

On the hackathon page you can:

1. **Start project** — create / attach your Devpost project for OpsConcierge  
2. **Find teammates** — optional; solo entry is allowed  
3. **Import from portfolio** — pull an existing Devpost portfolio project into this hackathon  
4. **View full rules** — https://www.geminixprize.com/rules  
5. **View schedule** — submission / judging / finals dates above  

---

## Who can participate

**Open to**

- Individuals **above the age of majority** in their country of residence  
- Teams of eligible individuals  
- Small organizations with **&lt; 25 employees**

**Not open to**

- Residents / orgs in **excluded countries/territories** (U.S. sanctions / OFAC and similar — e.g. Russia, Crimea, Cuba, Iran, North Korea; see full rules)  
- Sponsor/Administrator employees and related parties, judges, conflict-of-interest cases  

Always confirm eligibility against the live rules before submitting.

---

## Official project categories

Pick **at least one** on the Devpost submission form:

| Category | Fit for OpsConcierge |
|----------|----------------------|
| Education & Human Potential | Secondary (hiring / upskilling angle) |
| Entrepreneurship & Job Creation | Secondary (hiring concierge) |
| **Small Business Services** | **Primary** — support + ops tools for SMBs |
| Money & Financial Access | Weak fit |
| Professional Services Access | Secondary — expert support / hiring guidance |

**Recommended submission category:** Small Business Services.

*(Devpost browse tags ML/AI · Education · Productivity are listing labels — use the official categories above on the form.)*

---

## Hard requirements (rules)

| Requirement | OpsConcierge plan |
|-------------|-------------------|
| **Gemini API** — at least one LLM call in the **deployed** app | Widget/chat path (`GEMINI_API_KEY`) |
| **≥1 Google Cloud product** | Firebase Realtime Database (agent-run evidence) |
| **Real business** — users + **revenue** in the 90-day window | Outreach + paid/pilot path — see `docs/BUSINESS_PLAN.md` + `evidence/customers/` |
| **New work in window** | Explain Relay AI → OpsConcierge build during May–Aug 2026; disclose pre-existing boilerplate |
| Live demo URL + repo (public or share with `testing@devpost.com` / `judging@hacker.fund`) | Vercel + GitHub |
| **Demo video &lt; 3 minutes** (YouTube/Vimeo/Youku, public) | `evidence/demo/script.md` |
| Revenue + cost + user evidence on form | Assemble before submit |

Extra LLM providers (e.g. OpenRouter) are allowed **alongside** Gemini.

---

## Judging (equally weighted)

After pass/fail viability:

1. **Business viability** — real launch, real users, real revenue, sustainable model  
2. **AI-native operations** — AI live in production, executing key business decisions  
3. **Category impact** — meaningful move in the chosen category  

---

## Prize structure (high level)

| Place | Amount |
|-------|--------|
| 1st | $500,000 |
| 2nd | $200,000 |
| 3rd–5th | $100,000 each |
| Runner-ups + category awards | Additional awards (see full rules) — **max one prize per project** |

Total pool: **$2,000,000**.

---

## OpsConcierge submission snapshot

| Field | Draft |
|-------|--------|
| **Product** | OpsConcierge |
| **Code** | `OpsConcierge-App` (repo historically `relay-ai`) |
| **Live** | **https://support-ai-nine-mu.vercel.app** (public) · relay-ai-app is login-walled |
| **Category** | Small Business Services |
| **One-liner** | AI concierge that runs SMB support + hiring — Gemini answers, tickets, execution logs |
| **Judge path** | Landing → widget chat → escalate → `/widget/intake` |
| **Health** | Public: `GET /api/health` · XPRIZE route after redeploy: `GET /api/health/xprize` |

---

## Related docs

- [RULES_SUMMARY.md](./RULES_SUMMARY.md) — compliance strategy for this repo  
- [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md) — Devpost form + demo pre-flight  
- [ROADMAP_12_DAYS.md](./ROADMAP_12_DAYS.md) — ~12 days to deadline  
- [PRODUCT_VISION.md](./PRODUCT_VISION.md) · [BUSINESS_PLAN.md](./BUSINESS_PLAN.md)  
- [../evidence/demo/script.md](../evidence/demo/script.md)
