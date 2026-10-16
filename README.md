# OpsConcierge

**The AI ops desk for small businesses** — deflect FAQs on your site, escalate with full chat context, and shortlist hires from resume PDFs. Support runs leave an auditable execution log.

| | |
|---|---|
| **Repo** | https://github.com/YatharthSharma1309/opsconcierge |
| **Folder** | `OpsConcierge-App` |

## Two agent lanes

| Lane | Flow |
|------|------|
| **Support** | Widget → FAQ / RAG answer → escalate → ticket → **execution log** (`/widget/intake`) |
| **Hiring** | Job post → resume upload → AI match score / shortlist → pipeline |

## Quick start

```bash
npm install
cp .env.example .env
# Required: DATABASE_URL (Postgres / Neon)
# Free LLM: OPENROUTER_API_KEY + AI_PROVIDER_PREFERENCE=openrouter
# Optional: Clerk keys, or AUTH_BYPASS=true for local demo without Clerk
npm run db:migrate
npm run db:seed
npm run dev
```

Open **http://localhost:3000**.

See [`.env.example`](./.env.example) for all variables. Never commit real API keys.

### Demo mode (no Clerk)

In `.env` (local only — never enable bypass on a real production tenant):

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
Database readiness: `GET /api/health`.

## Live demo

| Host | Status |
|------|--------|
| **https://support-ai-nine-mu.vercel.app** | **Public** |
| https://relay-ai-app.vercel.app | Deployment-protected (Vercel login) — not public |

**Health:** `GET /api/health` on the public host checks Postgres.

**Product path:** landing → widget chat → escalate / ticket → `/widget/intake` execution log → optional `/recruitment` shortlist.

## Stack

Next.js 16 · React 19 · TypeScript · Prisma + Neon Postgres · Clerk (demo bypass optional) · Gemini / OpenRouter · Firebase RTDB (optional evidence) · Vercel

## Modules (dashboard)

| Area | Routes |
|------|--------|
| Support | `/dashboard`, `/knowledge`, `/chat`, `/inbox`, `/tickets`, `/widget` |
| Execution logs | `/widget/intake`, `/widget/intake/[runId]` |
| Hiring | `/recruitment`, jobs + candidates |
| Analytics | `/analytics` |
| Public | `/help/[slug]`, `/widget/embed` |

## Docs

| Doc | Why |
|-----|-----|
| [docs/README.md](./docs/README.md) | Full documentation index |
| [docs/REAL_WORLD_USE.md](./docs/REAL_WORLD_USE.md) | SMB personas & workflows |
| [docs/FOUNDATION.md](./docs/FOUNDATION.md) | What exists in the codebase |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design |
| [DEPLOY.md](./DEPLOY.md) | Vercel + Neon + Clerk production |

## License

Private / portfolio — see repo owner for terms.
