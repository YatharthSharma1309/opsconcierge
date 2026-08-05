# Free LLM path (no payment)

You do **not** need a paid Google plan to develop or demo OpsConcierge.

## Default free path: OpenRouter

1. Create a free key: https://openrouter.ai/keys  
2. In `.env`:

```bash
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_CHAT_MODEL=openrouter/free
AI_PROVIDER_PREFERENCE=openrouter
```

`AI_PROVIDER_PREFERENCE=openrouter` (or `free`) **skips Gemini**, so a zero-quota Gemini key will not break chat with 429s.

## Keep Gemini for XPRIZE later (still free)

Build with Gemini XPRIZE requires **at least one Gemini API call** in the deployed app. That can still be $0 if Google AI Studio free generate quota works:

1. https://aistudio.google.com/apikey — try a **new project** if generate returns quota limit 0  
2. Set `GEMINI_API_KEY` + `AI_PROVIDER_PREFERENCE=auto`  
3. OpenRouter remains the automatic fallback if Gemini fails  

Firebase Realtime Database Spark is also free for GCP evidence — see [GCP_AND_GEMINI_SETUP.md](./GCP_AND_GEMINI_SETUP.md).

## Health check

`GET /api/health/xprize`

| Field | Meaning |
|-------|---------|
| `readyForFreeDemo` | OpenRouter configured |
| `readyForXprizeDemo` | Gemini + Firebase evidence configured |
| `providerPreference` | `openrouter` / `auto` / `gemini` |
