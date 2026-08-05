# OpsConcierge

**Folder:** `OpsConcierge-App`  
**Repo:** https://github.com/YatharthSharma1309/opsconcierge  
**Product:** OpsConcierge — the AI concierge that runs your business operations.

Next.js multi-tenant support + hiring agents. Formerly the Relay AI codebase; public brand for XPRIZE is **OpsConcierge**.

| Agent lane | What it does |
|------------|----------------|
| **Support concierge** | Widget intake → RAG answer → ticket update + execution log |
| **Hiring concierge** | Resume screen, match score, interview questions, pipeline |

**Mandatory stack for judges** ([Build with Gemini XPRIZE](https://xprize.devpost.com) — $2M)

- **Gemini API** (production LLM on the hero widget/chat path)
- **Firebase Realtime Database** (free Google Cloud evidence of agent runs)
- Deployed app (Vercel) + Neon Postgres

**Deadline:** 18 Aug 2026 @ 1:30 AM GMT+5:30 · Category: Small Business Services · See [docs/HACKATHON.md](./docs/HACKATHON.md)

## Live demo

**https://relay-ai-app.vercel.app** (also https://support-ai-nine-mu.vercel.app)

Judge path: landing → widget chat → escalate/ticket → `/widget/intake` execution log.

## Quick start

```bash
npm install
cp .env.example .env
# Required: DATABASE_URL
# Free LLM (no payment): OPENROUTER_API_KEY + AI_PROVIDER_PREFERENCE=openrouter
# For XPRIZE later: GEMINI_API_KEY + FIREBASE_DATABASE_URL + AI_PROVIDER_PREFERENCE=auto
# Optional: Clerk keys or AUTH_BYPASS=true for local demo
npm run db:migrate
npm run db:seed
npm run dev
```

### Free LLM path (no payment)

Gemini free-tier quota is sometimes **0** on new Google keys. Until a free Gemini quota works, use **OpenRouter free models** (already supported):

```
OPENROUTER_API_KEY=...          # https://openrouter.ai/keys — free
OPENROUTER_CHAT_MODEL=openrouter/free
AI_PROVIDER_PREFERENCE=openrouter
```

Chat skips Gemini and uses OpenRouter. When you get a working free Gemini key, set `AI_PROVIDER_PREFERENCE=auto` (Gemini first, OpenRouter fallback).

### Free Gemini + Firebase (XPRIZE — still $0)

1. Gemini key: https://aistudio.google.com/apikey (use a project with free generate quota)
2. Firebase project → enable **Realtime Database** (Spark / test mode OK for demo)
3. Add to `.env`:

```
GEMINI_API_KEY=...
GEMINI_CHAT_MODEL=gemini-2.0-flash
FIREBASE_DATABASE_URL=https://YOUR_PROJECT-default-rtdb.firebaseio.com
AI_PROVIDER_PREFERENCE=auto
```

Full steps: [docs/GCP_AND_GEMINI_SETUP.md](./docs/GCP_AND_GEMINI_SETUP.md)

## Modules

### Support (`/dashboard`, `/knowledge`, `/chat`, `/inbox`, `/tickets`, `/widget`)

- Upload PDF, DOCX, TXT, Markdown → chunked RAG index
- Streaming admin + widget chat (Gemini when configured)
- Ticket escalation + analytics
- **Widget intake demo / execution logs:** `/widget/intake`

### Recruitment (`/recruitment`)

- Job posts, resume parsing, AI match scoring, hiring pipeline

## Stack

Next.js 16 · React 19 · TypeScript · Prisma + PostgreSQL · Clerk · Gemini · OpenRouter fallback · Firebase RTDB (evidence)

## Related

- [Hackathon brief](./docs/HACKATHON.md) — Build with Gemini XPRIZE ($2M)
- [Documentation index](./docs/README.md)
- [Technical foundation](./docs/FOUNDATION.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Gemini + Firebase setup](./docs/GCP_AND_GEMINI_SETUP.md)
- [Production deployment](./DEPLOY.md)
## License

Private / portfolio — see repo owner for terms.
