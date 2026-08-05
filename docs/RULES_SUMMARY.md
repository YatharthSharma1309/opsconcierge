# Build with Gemini XPRIZE — Rules Summary (OpsConcierge)

**Official:** [Build with Gemini XPRIZE](https://www.geminixprize.com) · [Devpost](https://xprize.devpost.com) · [Full rules](https://www.geminixprize.com/rules)  
**Sponsor:** XPRIZE · **Admin:** Devpost · **Prizes:** $2,000,000 cash · **Online / Public**

This file is a **working summary for our submission**. It is not legal advice — always verify against the live rules.

---

## Snapshot

| Item | Value |
|------|--------|
| Tagline | Build with Gemini. Ship products that impact the world. |
| Deadline (IST) | **18 Aug 2026 @ 1:30 AM GMT+5:30** |
| Deadline (PT) | 17 Aug 2026 @ 1:00 PM PT |
| Time left (~5 Aug) | **~12 days** |
| Participants | ~23,956 on Devpost (changes over time) |
| Our category | **Small Business Services** |
| Devpost tags | Machine Learning/AI · Education · Productivity |

Devpost UI: **Start project** · **Find teammates** · **Import from portfolio** · View schedule / full rules.

---

## Eligibility (confirmed from rules)

- Above **age of majority** in country of residence  
- Individuals, teams, or orgs **&lt; 25 employees**  
- **Excluded** countries/territories where U.S./local law blocks participation (OFAC list and similar — see full rules)

---

## Must-haves for our entry

| Official requirement | Our proof |
|----------------------|-----------|
| Gemini API in **deployed** app (≥1 LLM call) | Widget/chat + execution log `model` + `/api/health/xprize` |
| ≥1 Google Cloud product | Firebase Realtime Database agent runs |
| Real users + revenue evidence | `evidence/customers/` + Devpost form fields |
| Demo video **&lt; 3 min**, public YouTube/Vimeo/Youku | Film from `evidence/demo/script.md` |
| Repo URL (public or share with testing@devpost.com / judging@hacker.fund) | GitHub `relay-ai` |
| Live URL for judges | https://relay-ai-app.vercel.app |
| Disclose pre-existing code / boilerplate | Relay AI → OpsConcierge narrative in Devpost description |
| Category selection | Small Business Services |

OpenRouter / other LLMs OK **in addition to** Gemini.

---

## Judging (3 equal criteria)

1. **Business viability** — launch, users, revenue, sustainable model  
2. **AI-native operations** — AI in production executing key decisions  
3. **Category impact** — meaningful SMB / ops impact  

Pass/fail first: fits theme + uses required Google/Gemini stack.

---

## Our compliance map

| Judge question | Answer / proof |
|----------------|----------------|
| Uses Gemini? | Widget chat + log + health endpoint |
| Uses Google Cloud? | Firebase RTDB + console screenshot |
| Deployed? | Vercel live URL |
| AI runs the business? | Intake → answer → ticket → execution log |
| Real business? | Outreach list, users, revenue fields on Devpost |
| Category? | Small Business Services |

Health: `GET /api/health/xprize` → `readyForXprizeDemo: true`

---

## Disqualifiers to avoid

- Localhost-only / Gemini unset on production  
- Fake customers or testimonials presented as real  
- Secrets in repo or screenshots  
- Video &gt; 3 minutes or private link  
- No Gemini call in the **deployed** path  
- Missing revenue/user evidence fields on Devpost  

---

## References

- Full brief: [`docs/HACKATHON.md`](./HACKATHON.md)  
- Checklist: [`docs/SUBMISSION_CHECKLIST.md`](./SUBMISSION_CHECKLIST.md)  
- Official rules: https://www.geminixprize.com/rules  
- Gemini key: https://aistudio.google.com/apikey  
- Firebase: https://console.firebase.google.com
