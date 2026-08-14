# OpsConcierge — production deployment

Vercel (Next.js) + Neon Postgres + Clerk, with Gemini and/or OpenRouter for LLM, and optional Firebase RTDB for agent-run evidence.

## Architecture

```
Browser → Vercel (Next.js) → Neon PostgreSQL
         ↓
       Clerk (auth + orgs; demo bypass optional)
         ↓
       Gemini and/or OpenRouter (chat + RAG)
         ↓
       Firebase RTDB (optional XPRIZE evidence)
```

## Prerequisites

- [ ] GitHub repo: [`YatharthSharma1309/opsconcierge`](https://github.com/YatharthSharma1309/opsconcierge)
- [ ] [Neon](https://neon.tech) PostgreSQL project
- [ ] [Clerk](https://clerk.com) application (production instance) — or demo bypass vars for portfolio-only deploys
- [ ] [OpenRouter](https://openrouter.ai) and/or [Gemini](https://aistudio.google.com/apikey) API key
- [ ] Optional: [Firebase](https://console.firebase.google.com/) Realtime Database for execution evidence

## 1. Neon database

1. Create project → copy **pooled** connection string with `sslmode=require`
2. Set as `DATABASE_URL` in Vercel

## 2. Clerk

1. Create application → copy publishable + secret keys
2. Enable Organizations
3. Configure sign-in/sign-up URLs for your Vercel domain
4. Webhooks → add endpoint `https://YOUR-APP.vercel.app/api/webhooks/clerk`
5. Copy webhook signing secret → `CLERK_WEBHOOK_SECRET`

Skip Clerk setup only if you intentionally ship a **public demo** with auth bypass (see Portfolio section). Never use bypass for a real customer tenant.

## 3. Vercel environment variables

| Item | Value |
|------|--------|
| GitHub | https://github.com/YatharthSharma1309/opsconcierge |
| Current production hosts | **https://support-ai-nine-mu.vercel.app** (public) · https://relay-ai-app.vercel.app (login-walled) |

Set `APP_URL` to your primary production URL.

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Neon pooled URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes* | *Not needed if demo bypass only |
| `CLERK_SECRET_KEY` | Yes* | |
| `CLERK_WEBHOOK_SECRET` | Yes* | |
| `OPENROUTER_API_KEY` | Recommended | Free models via `openrouter/free` |
| `GEMINI_API_KEY` | For XPRIZE | Pair with `AI_PROVIDER_PREFERENCE=auto` |
| `FIREBASE_DATABASE_URL` | For XPRIZE | RTDB evidence of agent runs |
| `AI_PROVIDER_PREFERENCE` | No | `openrouter` (free path) · `auto` · `gemini` |
| `APP_URL` | Yes | `https://YOUR-APP.vercel.app` |
| `OPENROUTER_CHAT_MODEL` | No | Default `openrouter/free` |
| `DEMO_SEED_SECRET` | Yes (prod) | Random string for `POST /api/demo/seed` |
| `AUTH_BYPASS` | **Never on real prod** | Portfolio demo only |

Optional: `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` for distributed rate limits.  
Optional: `OPS_WORKER_URL` if you deploy [`cloud-run/ops-worker`](./cloud-run/ops-worker/README.md).

Full local reference: [`.env.example`](./.env.example). Free LLM notes: [`docs/FREE_LLM.md`](./docs/FREE_LLM.md).

## 4. Build settings

Vercel auto-detects Next.js. Recommended build command:

```
npm run db:migrate:deploy && npm run build
```

Or run migrations post-deploy from local:

```bash
DATABASE_URL="..." npm run db:migrate:deploy
```

## 5. Post-deploy seed

```bash
curl -X POST https://YOUR-APP.vercel.app/api/demo/seed \
  -H "x-demo-seed-secret: YOUR_DEMO_SEED_SECRET"
```

Then upload 2–3 FAQ documents via Knowledge Base. Seed also creates a sample recruitment job at `/recruitment`.

## 6. Widget + execution log demo

1. Sign in (or open demo mode) → Settings → Widget → copy embed snippet
2. Chat on the widget → escalate to a ticket
3. Open **`/widget/intake`** to show the execution log (judge path)

## 7. Portfolio / public demo

**Live demo (public):** https://support-ai-nine-mu.vercel.app

### Redeploy checklist (OpsConcierge branding + xprize health)

1. Deploy this repo to the Vercel project that serves **support-ai-nine-mu**
2. Set `APP_URL=https://support-ai-nine-mu.vercel.app`
3. Confirm landing title is **OpsConcierge** (not Relay AI)
4. `curl -s https://support-ai-nine-mu.vercel.app/api/health`
5. `curl -s https://support-ai-nine-mu.vercel.app/api/health/xprize` (expect `readyForXprizeDemo: true` after Firebase is set)

Recommended walkthrough when `PUBLIC_DEMO_MODE` is enabled (no sign-in):

1. **Landing** → **Open live demo**
2. **Dashboard** — setup health, stats, recent tickets
3. **AI Chat** (`/chat`) — ask a FAQ; show citations
4. **Widget intake** (`/widget/intake`) — execution log for a run
5. **Recruitment** (`/recruitment`) — demo job → candidate → **Run analysis**
6. **Analytics** (`/analytics`) — deflection / knowledge gaps
7. **Help center** (`/help/demo-company`) — public KB + widget
8. **Widget** (`/widget`) — embed preview

### Portfolio env (Vercel — demo only)

```bash
node scripts/push-vercel-env.mjs   # sync demo env from local .env
npx vercel --prod --yes
curl -X POST https://YOUR-APP.vercel.app/api/demo/seed \
  -H "x-demo-seed-secret: YOUR_DEMO_SEED_SECRET"
```

| Variable | Portfolio demo |
|----------|----------------|
| `PUBLIC_DEMO_MODE` | `true` |
| `NEXT_PUBLIC_PUBLIC_DEMO_MODE` | `true` |
| `AUTH_BYPASS` | `true` (demo only) |
| `NEXT_PUBLIC_AUTH_BYPASS` | `true` |
| `DEMO_WIDGET_KEY` | stable key for embed/tests |
| `APP_URL` | your Vercel URL |

For a **private production** app, remove demo bypass vars and configure Clerk keys instead.

## Smoke test

- [ ] `GET /api/health` returns OK
- [ ] `GET /api/health/xprize` shows expected Gemini / Firebase / OpenRouter flags
- [ ] Sign up + create org (or demo dashboard opens)
- [ ] Upload document → chat with citation
- [ ] Widget escalate → ticket → `/widget/intake` log
- [ ] `/recruitment` — demo job + candidate pipeline

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Clerk redirect loop | Set correct URLs in Clerk dashboard |
| DB connection error | Use Neon pooled URL with SSL |
| Chat empty / 429 | Use `AI_PROVIDER_PREFERENCE=openrouter` + valid `OPENROUTER_API_KEY`; or fix Gemini quota |
| Webhook 401 | Check `CLERK_WEBHOOK_SECRET` |
| No execution log | Chat via **widget** stream path, then open `/widget/intake` |

## Security

- Never set `AUTH_BYPASS` or `E2E_AUTH_BYPASS` on a real customer production tenant
- Do not commit `.env` or real API keys
- Set OpenRouter / Gemini spend limits where available
