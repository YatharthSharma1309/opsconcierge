# Gemini + Firebase setup (free path)

Step-by-step setup for the **XPRIZE judge path**: Gemini as the primary support LLM and Firebase Realtime Database as Google Cloud evidence. No `gcloud` CLI or extra npm packages required.

## What you get

| Service | Cost | Purpose in OpsConcierge |
|---------|------|-------------------------|
| [Google AI Studio](https://aistudio.google.com/apikey) | Free tier API key | Widget + admin support chat via Gemini |
| [Firebase Realtime Database](https://console.firebase.google.com/) | Spark (free) | Agent-run evidence when Gemini succeeds |

Optional: Cloud Run worker in `cloud-run/ops-worker/` — **not needed** if Firebase RTDB is configured.

## 1. Gemini API key

1. Open https://aistudio.google.com/apikey
2. Sign in with a Google account
3. Click **Create API key** (pick or create a Google Cloud project when prompted)
4. Copy the key

Add to `.env` (local) or Vercel environment variables (production):

```bash
GEMINI_API_KEY=your-key-here
GEMINI_CHAT_MODEL=gemini-2.0-flash
```

`GEMINI_CHAT_MODEL` is optional; default is `gemini-2.0-flash` (see `src/lib/gemini.ts`).

### Where Gemini is used

| File | Role |
|------|------|
| `src/lib/gemini.ts` | REST client to `generativelanguage.googleapis.com` |
| `src/lib/chat/service.ts` | `generateChatReply`, `streamChatReply`, sandbox chat — tries Gemini before OpenRouter |
| `src/lib/chat/stream-handler.ts` | Widget/admin SSE streams; logs execution when channel ≠ `ADMIN` |
| `src/lib/ai.ts` | `isAiConfigured()` includes Gemini |
| `src/app/api/health/xprize/route.ts` | Readiness check |

Recruitment (`src/lib/recruitment/`) uses **OpenRouter only**, not Gemini.

### Verify Gemini locally

```bash
npm run dev
curl http://localhost:3000/api/health/xprize
```

Expect `"gemini": { "configured": true, "model": "gemini-2.0-flash" }`.

Then open `/chat` or the widget preview at `/widget` and ask a question grounded in uploaded docs.

## 2. Firebase Realtime Database

Firestore is **not** used for evidence — RTDB allows simple REST writes without OAuth (see comment in `src/lib/ops-worker.ts`).

### Create project + database

1. Go to https://console.firebase.google.com/
2. **Add project** (or use the same GCP project as your Gemini key)
3. In the left menu: **Build → Realtime Database**
4. Click **Create Database**
5. Choose a region (e.g. `us-central1`)
6. For demo/judge use: start in **test mode** (open read/write rules). For production, restrict rules.

**XPRIZE demo project (Aug 2026):** `opsconcierge-xprize`, US (`us-central1`), URL `https://opsconcierge-xprize-default-rtdb.firebaseio.com`. Test-mode rules are enabled through mid-September 2026 (after the contest deadline). Writes go to `opsconcierge_agent_runs`.

Copy the database URL shown at the top, e.g.:

```
https://YOUR_PROJECT-default-rtdb.firebaseio.com
```

### Environment variables

```bash
FIREBASE_DATABASE_URL=https://YOUR_PROJECT-default-rtdb.firebaseio.com
FIREBASE_RTDB_PATH=opsconcierge_agent_runs
```

`FIREBASE_RTDB_PATH` is optional (default: `opsconcierge_agent_runs`). Records are POSTed to:

```
{FIREBASE_DATABASE_URL}/{FIREBASE_RTDB_PATH}.json
```

Each payload includes: `workspace_id`, `agent`, `trigger`, `model`, `decision`, `latency_ms`, `summary`, `received_at`.

### When evidence is written

From `src/lib/chat/service.ts` → `logLlmCall` → `notifyOpsWorker`:

- Only when `decision === "gemini_success"` (successful Gemini completion on support chat)
- Fire-and-forget; chat UX is not blocked on RTDB success/failure

### Verify Firebase

1. Set env vars and restart dev server
2. Send a widget message (with knowledge base docs uploaded)
3. Check Firebase console → Realtime Database → `opsconcierge_agent_runs` for new child nodes

Or:

```bash
curl http://localhost:3000/api/health/xprize
```

Expect `"googleCloudEvidence": { "configured": true, "provider": "firebase_rtdb" }` and `"readyForXprizeDemo": true`.

## 3. Full `.env` block (XPRIZE minimum)

Add alongside your existing `DATABASE_URL` and optional Clerk keys:

```bash
# Gemini (primary support LLM)
GEMINI_API_KEY=your-gemini-api-key
GEMINI_CHAT_MODEL=gemini-2.0-flash

# Firebase RTDB (GCP evidence)
FIREBASE_DATABASE_URL=https://YOUR_PROJECT-default-rtdb.firebaseio.com
FIREBASE_RTDB_PATH=opsconcierge_agent_runs

# Fallback LLM (recommended — used when Gemini fails + recruitment)
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_CHAT_MODEL=openrouter/free
```

See `.env.example` for the complete variable list.

## 4. Vercel production

In your Vercel project (https://vercel.com — project **relay-ai**):

1. Settings → Environment Variables
2. Add `GEMINI_API_KEY`, `GEMINI_CHAT_MODEL`, `FIREBASE_DATABASE_URL`, `FIREBASE_RTDB_PATH`
3. Redeploy

Production URLs:

- https://support-ai-nine-mu.vercel.app (**public**)
- https://relay-ai-app.vercel.app (legacy alias)

Smoke test:

```bash
curl -s https://support-ai-nine-mu.vercel.app/api/health
# After redeploying OpsConcierge:
curl -s https://support-ai-nine-mu.vercel.app/api/health/xprize
```

## 5. Judge walkthrough

1. **Landing** → open live demo
2. **Widget** (`/widget`) → send a support question
3. **Escalate** → create ticket from widget
4. **Widget intake** (`/widget/intake`) → screenshot execution log (lane → Gemini → ticket)
5. **Firebase console** → show RTDB entries under `opsconcierge_agent_runs`

## Optional: Cloud Run worker

Only if you want Cloud Logging / GCS instead of (or in addition to) RTDB:

```bash
# Requires gcloud CLI — see cloud-run/ops-worker/README.md
OPS_WORKER_URL=https://opsconcierge-worker-xxxxx.run.app
```

If `FIREBASE_DATABASE_URL` is set, RTDB is preferred; Cloud Run is used only when RTDB is unset.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `gemini.configured: false` | Set `GEMINI_API_KEY`; no typos or placeholder value |
| Gemini 403/429 | Check API key, quota, and model name in `GEMINI_CHAT_MODEL` |
| `googleCloudEvidence.configured: false` | Set `FIREBASE_DATABASE_URL` |
| RTDB writes fail (403) | Relax Realtime Database rules for demo, or add auth |
| Chat works but no RTDB rows | Evidence only fires on `gemini_success`; confirm Gemini is used (not OpenRouter-only) |
| Empty widget answers | Upload docs to Knowledge Base; check `/api/health` for DB |

## Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) — how Gemini and RTDB fit in the system
- [FOUNDATION.md](./FOUNDATION.md) — routes and local dev
- [DEPLOY.md](../DEPLOY.md) — full Vercel + Neon + Clerk deployment
