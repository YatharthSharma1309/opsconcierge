# Technical foundation

OpsConcierge is a multi-tenant Next.js app with two agent lanes: **support concierge** (widget + tickets + RAG) and **hiring concierge** (recruitment pipeline). This doc describes what exists in the codebase today.

## Stack

| Layer | Technology |
|-------|------------|
| App | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Database | PostgreSQL via Prisma 7 |
| Auth | Clerk (organizations + webhooks) |
| LLM (primary) | Gemini API (`src/lib/gemini.ts`) |
| LLM (fallback) | OpenRouter (`src/lib/ai.ts`) |
| Evidence | Firebase Realtime Database REST (`src/lib/ops-worker.ts`) |
| Optional worker | Cloud Run ops-worker (`cloud-run/ops-worker/`) |
| Rate limits | In-memory; optional Upstash Redis |

## Modules

### Support concierge

| Area | Routes | Notes |
|------|--------|-------|
| Dashboard | `/dashboard` | Next-step banner, queue summary, recent tickets |
| Knowledge base | `/knowledge` | Upload PDF, DOCX, TXT, Markdown → chunked RAG index |
| AI chatbot | `/chat` | Streaming admin chat with citations |
| Agent inbox | `/inbox`, `/inbox/[id]` | Conversation threads |
| Tickets | `/tickets`, `/tickets/new`, `/tickets/[id]` | Escalation, operator brief (`triage`), comments, AI suggest-reply |
| Analytics | `/analytics` | Deflection rate, knowledge gaps → draft FAQ |
| Widget | `/widget` | Embed preview + iframe snippet |
| Widget intake demo | `/widget/intake`, `/widget/intake/[runId]` | Execution log + storyboard for judges |
| Public help center | `/help`, `/help/[slug]` | Public KB + embedded widget |
| Widget embed (public) | `/widget/embed?key=...` | Customer-facing chat bubble |

### Hiring concierge

| Area | Routes | Notes |
|------|--------|-------|
| Pipeline | `/recruitment` | Job list + candidate overview |
| Jobs | `/recruitment/jobs/new`, `/recruitment/jobs/[id]`, `.../edit` | Job criteria, AI assist |
| Candidates | `/recruitment/jobs/[id]/candidates/[candidateId]` | Resume parse, match score, interview questions |

Recruitment AI uses **OpenRouter only** (`src/lib/recruitment/openrouter.ts`), not Gemini.

## Key API routes

| Route | Purpose |
|-------|---------|
| `POST /api/chat/stream` | Admin chat SSE stream |
| `POST /api/widget/chat/stream` | Widget chat SSE stream (creates execution runs) |
| `POST /api/widget/tickets` | Widget ticket escalation (+ execution log entry) |
| `POST /api/documents/upload` | Knowledge base upload |
| `POST /api/recruitment/analyze` | Candidate AI analysis |
| `POST /api/demo/seed` | Demo workspace seed (requires `DEMO_SEED_SECRET` in prod) |
| `GET /api/health` | DB connectivity check |
| `GET /api/health/xprize` | Gemini + Firebase RTDB readiness check |
| `POST /api/webhooks/clerk` | Clerk org/user sync |

## Database (Prisma)

Schema: `prisma/schema.prisma`. Key models:

- **Organization** — multi-tenant workspace; `widgetPublicKey` for embed auth
- **Document** / **DocumentChunk** — RAG knowledge (embeddings stored as JSON)
- **Conversation** / **Message** — chat history (channels: `ADMIN`, `WIDGET`, `HELP_CENTER`)
- **Ticket** / **TicketComment** — support escalations
- **Job** / **Candidate** / **CandidateAnalysis** — recruitment pipeline
- **ExecutionRun** / **ExecutionLogEntry** — widget intake audit trail (added in migration `20260805154000_add_execution_log_demo`)

Run migrations:

```bash
npm run db:migrate      # local dev
npm run db:migrate:deploy  # production
npm run db:seed         # demo org + sample data
```

## Local development

```bash
npm install
cp .env.example .env
# Required: DATABASE_URL
# For XPRIZE demo: GEMINI_API_KEY + FIREBASE_DATABASE_URL
# Optional: Clerk keys, or AUTH_BYPASS=true for local demo
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://localhost:3000.

### Environment variables (summary)

See `.env.example` for the full list. Minimum for local support chat:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Local Postgres or Neon |
| `GEMINI_API_KEY` | XPRIZE path | Primary LLM for support chat |
| `FIREBASE_DATABASE_URL` | XPRIZE path | GCP evidence writes |
| `OPENROUTER_API_KEY` | Fallback | Used when Gemini fails or for recruitment |
| Clerk keys | Prod auth | Or `AUTH_BYPASS=true` for local demo |

### npm scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` / `start` | Production build |
| `npm run db:migrate` | Apply Prisma migrations (dev) |
| `npm run db:seed` | Seed demo workspace |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright E2E |
| `npm run lint` / `typecheck` | Code quality |

## Auth modes

- **Production:** Clerk organizations; users belong to orgs via `OrganizationMember`
- **Demo / local:** `AUTH_BYPASS=true` + `PUBLIC_DEMO_MODE=true` skips Clerk; uses demo org from seed
- **Widget:** Public key in query/header; visitor sessions signed with optional `WIDGET_VISITOR_SECRET`

## Where to read next

- [ARCHITECTURE.md](./ARCHITECTURE.md) — request flows and component boundaries
- [GCP_AND_GEMINI_SETUP.md](./GCP_AND_GEMINI_SETUP.md) — Gemini + Firebase setup
- [DEPLOY.md](../DEPLOY.md) — Vercel production deployment
