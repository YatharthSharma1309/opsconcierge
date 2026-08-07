# Project inventory (OpsConcierge)

Live inventory checked **7 Aug 2026** (Neon MCP + Vercel CLI + public web).

## Summary

| Layer | Count | Notes |
|-------|-------|-------|
| Product | **1** | OpsConcierge (package `opsconcierge`) |
| Neon Postgres | **3** | Only **SupportAI** powers this app |
| Vercel apps | **6** | Only **relay-ai** is the OpsConcierge deploy |
| GitHub remotes | **2** | `opsconcierge` (canonical) + legacy `relay-ai` |

---

## Neon projects (org: Yatharth / `org-royal-rice-04815983`)

| Neon project | ID | Role for OpsConcierge |
|--------------|----|------------------------|
| **SupportAI** | `shy-king-36734093` | **Active DB** (us-east-1, PG 18) — linked in `.neon` |
| debrief | `lucky-river-87858598` | Unrelated |
| ai-sales-assistant-crm | `delicate-truth-29425014` | Unrelated |

---

## Vercel projects (team: yatharthsharma1309s-projects)

| Vercel project | Production URL | Role |
|----------------|----------------|------|
| **relay-ai** | https://support-ai-nine-mu.vercel.app | **OpsConcierge / hackathon demo** |
| yatharth-portfolio | https://yatharth-portfolio-tau.vercel.app | Portfolio |
| yatharthsharma | https://yatharthsharma.vercel.app | Personal |
| debrief | https://debrief-psi.vercel.app | Unrelated |
| ai-sales-assistant-crm | https://ai-sales-assistant-crm-phi.vercel.app | Unrelated |
| ai-sales-assistant-crm-api | https://ai-sales-assistant-crm-api.vercel.app | Unrelated |

**Protected / not for judges:** https://relay-ai-app.vercel.app (Vercel login wall).

---

## GitHub

| Remote | URL |
|--------|-----|
| **origin** | https://github.com/YatharthSharma1309/opsconcierge |
| relay-ai (legacy) | https://github.com/YatharthSharma1309/relay-ai |

---

## Hackathon judge URL

**Use:** https://support-ai-nine-mu.vercel.app  

Verified **7 Aug 2026** after production redeploy (`relay-lidar488o`):

| Check | Result |
|-------|--------|
| Branding | **OpsConcierge** (Relay AI gone) |
| Demo CTA | Open live demo (auth bypass) |
| `GET /api/health` | ok · database connected |
| `GET /api/health/xprize` | product OpsConcierge · Gemini configured · OpenRouter ready |
| `readyForXprizeDemo` | **false** until `FIREBASE_DATABASE_URL` is set (Spark RTDB) |

### Remaining XPRIZE env step

1. Create a Firebase project → Realtime Database (Spark) → copy URL  
2. Set on Vercel production: `FIREBASE_DATABASE_URL` (+ optional `FIREBASE_RTDB_PATH=opsconcierge_agent_runs`)  
3. Redeploy: `npx vercel --prod --yes`  
4. Confirm `readyForXprizeDemo: true` at `/api/health/xprize`

See [GCP_AND_GEMINI_SETUP.md](./GCP_AND_GEMINI_SETUP.md).
