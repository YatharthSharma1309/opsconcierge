# OpsConcierge

The wordmark on the screens is **Penaven**. The repository, the package name, and the public host stay.

**Penaven is the support desk for a small team.** Customers get answers from the documents you already have, with the passage named. When those documents do not cover a question, a person gets the conversation. When a role opens, the shortlist stays in the same workspace.

| | |
|---|---|
| **Repo** | https://github.com/YatharthSharma1309/opsconcierge |
| **Folder** | `OpsConcierge-App` |
| **Wordmark** | Penaven — support desk for small teams |

## Two lanes

| Lane | What you do |
|------|-------------|
| **Support** | Site chat answers from the documents you upload and names the passage. When those documents do not cover the question, a person gets the conversation. The inbox shows **Open**, **Waiting for a human**, or **Answered**. Answered means the docs covered the last reply. It is not a closed case. The run log is `/widget/intake`. |
| **Hiring** | A role, the resumes, and each requirement next to the resume line. **Shown** and **Not shown**. You decide. The alignment figure stays on the candidate page after the lines. |

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
| **https://support-ai-nine-mu.vercel.app** | **Public** — Vercel project `relay-ai`. `GET /api/health` returned ok, database connected |
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
