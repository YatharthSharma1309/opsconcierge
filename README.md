# OpsConcierge

The wordmark on the screens is **Penaven**. The repository, the package name, and the public host stay.

**Penaven is the support desk for a small team.** Customers get answers from the documents you already have, with the passage named. When those documents do not cover a question, a person gets the conversation. When a role opens, the shortlist stays in the same workspace.

| | |
|---|---|
| **Repo** | https://github.com/YatharthSharma1309/penaven |
| **Folder** | `OpsConcierge-App` |
| **Wordmark** | Penaven — support desk for small teams |

## Two lanes

Support is the weekly desk. Hiring stays in the same workspace for the weeks a role is open. The top bar leads with Inbox, Tickets, Knowledge, and Widget. Hiring sits apart from those. Home, Boards, Run log, Chat, and Settings sit in the footer.

| Lane | What you do |
|------|-------------|
| **Support** | Site chat answers from the documents you upload and names the passage. When those documents do not cover the question, a person gets the conversation. |
| **Hiring** | Each requirement sits next to the resume line. You decide who moves forward. |

### Support

Five steps on the landing page, under **Walk the desk**:

1. **Upload the docs.** A FAQ, refund policy, or hours page. On Knowledge, a file is **Reading**, **Ready**, or **Could not read**. Ready means the next reply can cite it. Could not read means upload it again as a text file. A `.txt` or PDF is enough.
2. **Read the cited answer.** The site chat names the document and shows the passage under the reply. The line under a covered answer says it came from your docs. The bubble does not show retrieval jargon.
3. **Hand the thread to a person.** When the docs do not cover the question, the case keeps the conversation. The widget asks for an email and **Ask a person to take this**.
4. **Fill the gap in the docs.** Boards lists questions the docs did not cover, and answers someone marked wrong. **Draft a page**, edit it, then **Add to the docs**. That page shows up in Knowledge.
5. The hiring step is below. It is the same workspace, not a second product.

Inbox labels:

| On the inbox | What it means |
|--------------|----------------|
| **Open** | A reply is still needed. |
| **Waiting for a human** | A case is already with a person. The thread stays on that case. |
| **Answered** | The docs covered the last reply. This is not a closed case. |

A conversation shows the reply, the passage it used, and **Draft a page from this question** when the docs did not cover it. The case itself still uses Open, In progress, Resolved, and Closed. Those are the ticket, not the inbox label. Do not call a doc-grounded reply Resolved.

The run log at `/widget/intake` records what was retrieved and whether the reply came from the docs or went to a person. Labels there include **Answered from the docs**, **Needs a person**, **Docs did not cover it**, and **Handed to a person**.

Overview has a **This month** card: answers, resume screens, and roles against the Free caps (40, 5, and 1). Pro is $39/mo for the higher caps. There is no fee per answer, and no fee when a person takes the thread. Past the cap, the widget still offers a person. There is no upgrade button. Paid checkout is not stored yet, so a signed-in workspace stays on Free. The public demo skips the caps.

### Hiring

The landing step is **Compare the resume lines**. A missing line is not proof the skill is absent.

On a candidate, **Requirement evidence** comes first. Each requirement sits next to the resume line that supports it.

| Mark | What it means |
|------|----------------|
| **Shown** | The resume quotes that requirement. |
| **Inferred** | An indirect reading. |
| **Unverified** | Counted without a quote. |
| **Not shown** | The resume does not establish it. |
| **Contradicts** | The resume states the opposite. |

None of those marks is a decision. **Criteria alignment** (the percentage) sits after the lines. It is not a prediction of job performance and it is not a hiring recommendation. **Questions to ask** are written from the gaps. Compare, shortlist, or reject stays with a person. Nothing is rejected before someone reads it.

A role can **Export CSV** and **Copy shortlist link**. The public sample is `/demo/hiring` (Maya Chen, Jordan Ellis, Priya Nair, Full-Stack Engineer) and `/share/sample`. Compare two or three people at `/demo/hiring/compare`.

### What the screens show

- The mark is a filled **P** on indigo, with a teal page corner. The word under it is **Penaven**. The line under that is **Support desk for small teams**.
- Light is the default. The headline on the landing page is **Answers from your docs. A person when it isn’t.**
- The hero has two panels: **Answered, or a person** and **Lines, then you decide**.
- Pricing on the page is Free $0 and Pro $39/mo. Enterprise is listed as custom and later. The month is the price. Desks that bill per conversation or per resolution are called out as a different model.
- The page says what is not in this version: no phone line or WhatsApp Business, no live order tracking, no auto-reject, no enterprise call-center suite.

Channels, website crawl, and a checkout button are not on the screens, so the docs do not advertise them.

## Quick start

```bash
npm install
```

Create `.env.local` in the repo root. Next.js loads it. Required: `DATABASE_URL` (Postgres / Neon). The variable list is in [DEPLOY.md](./DEPLOY.md). Do not commit `.env.local`.

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Open **http://localhost:3000**.

### Demo mode (no Clerk)

In `.env.local` (local only — never enable bypass on a real production tenant):

```
AUTH_BYPASS=true
NEXT_PUBLIC_AUTH_BYPASS=true
PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_PUBLIC_DEMO_MODE=true
```

Then `npm run db:seed` and use the dashboard without signing in.

### Free LLM (OpenRouter — no payment)

Gemini free-tier quota is sometimes unavailable on new Google keys. For local/demo chat:

```
OPENROUTER_API_KEY=...          # https://openrouter.ai/keys
OPENROUTER_CHAT_MODEL=openrouter/free
AI_PROVIDER_PREFERENCE=openrouter
```

Details: [docs/FREE_LLM.md](./docs/FREE_LLM.md).

### Gemini + Firebase

When free Gemini quota works:

```
GEMINI_API_KEY=...
GEMINI_CHAT_MODEL=gemini-3.5-flash
FIREBASE_DATABASE_URL=https://YOUR_PROJECT-default-rtdb.firebaseio.com
AI_PROVIDER_PREFERENCE=auto
```

Full steps: [docs/GCP_AND_GEMINI_SETUP.md](./docs/GCP_AND_GEMINI_SETUP.md).  
Health: `GET /api/health`.

## Live demo

| Host | Status (checked 24 Oct 2026) |
|------|------------------------------|
| **https://penaven.vercel.app** | **Public** — Vercel project `penaven`. `GET /api/health` returned ok, database connected |
| https://relay-ai-app.vercel.app | Deployment-protected (Vercel login) — not public |

**Product path:** landing → site chat with the passage named → a person when the docs do not cover it → run log at `/widget/intake` → optional hiring shortlist.

**Price on the landing page:** Free $0 (40 assistant answers / month, 5 resume screens, 1 role). Pro $39/mo (250 answers, 40 screens, 5 roles). A new workspace stays on Free until a paid plan is stored. The public demo skips these caps. There is no fee per answer, and no fee when a person takes the thread.

Sample hiring, no sign-in: `/demo/hiring` and `/share/sample`.

## Stack

Next.js 16 · React 19 · TypeScript · Prisma + Neon Postgres · Clerk (demo bypass optional) · Gemini / OpenRouter · Firebase RTDB (optional evidence) · Vercel

## Modules (dashboard)

| Area | Routes |
|------|--------|
| Support | `/dashboard`, `/inbox`, `/tickets`, `/knowledge`, `/widget`, `/chat` |
| Run log | `/widget/intake`, `/widget/intake/[runId]` |
| Hiring | `/recruitment`, jobs, candidates, compare |
| Boards | `/analytics` |
| Public | `/help`, `/widget/embed`, `/demo/hiring`, `/share/sample`, `/share/[token]` |

## Docs

| Doc | Why |
|-----|-----|
| [docs/README.md](./docs/README.md) | Full documentation index |
| [docs/REAL_WORLD_USE.md](./docs/REAL_WORLD_USE.md) | SMB personas and workflows |
| [docs/FOUNDATION.md](./docs/FOUNDATION.md) | What exists in the codebase |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design |
| [docs/NAME_RESEARCH_2026-10-23.md](./docs/NAME_RESEARCH_2026-10-23.md) | Why the wordmark is Penaven |
| [DEPLOY.md](./DEPLOY.md) | Vercel + Neon + Clerk production |

## License

Private / portfolio — see repo owner for terms.
