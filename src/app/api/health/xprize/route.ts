import { NextResponse } from "next/server";
import {
  getAiProviderPreference,
  getChatModel,
  isAiConfigured,
  isOpenRouterConfigured,
  shouldAttemptGemini,
} from "@/lib/ai";
import { getGeminiChatModel, isGeminiConfigured } from "@/lib/gemini";
import { isGcpEvidenceConfigured } from "@/lib/ops-worker";

/** Lightweight XPRIZE readiness check (no secrets returned). */
export async function GET() {
  const gemini = isGeminiConfigured();
  const gcp = isGcpEvidenceConfigured();
  const openrouter = isOpenRouterConfigured();
  const preference = getAiProviderPreference();
  const anyLlm = isAiConfigured();

  return NextResponse.json({
    product: "OpsConcierge",
    providerPreference: preference,
    gemini: {
      configured: gemini,
      willAttempt: shouldAttemptGemini(),
      model: gemini ? getGeminiChatModel() : null,
    },
    openrouter: {
      configured: openrouter,
      model: openrouter ? getChatModel() : null,
      /** Free path: OpenRouter free models — no Google billing required */
      freePathReady: openrouter,
    },
    googleCloudEvidence: {
      configured: gcp,
      provider: gcp
        ? process.env.FIREBASE_DATABASE_URL?.trim()
          ? "firebase_rtdb"
          : "cloud_run_or_other"
        : null,
    },
    fallbackLlmConfigured: anyLlm && !gemini,
    /** App can demo without paid Gemini (OpenRouter free). */
    readyForFreeDemo: openrouter,
    /**
     * XPRIZE rules require Gemini API in the deployed app.
     * Keep Gemini key + set AI_PROVIDER_PREFERENCE=auto|gemini when free quota works.
     */
    readyForXprizeDemo: gemini && gcp,
    nextSteps: [
      !openrouter
        ? "Set OPENROUTER_API_KEY (free models: https://openrouter.ai/keys) or set AI_PROVIDER_PREFERENCE=openrouter"
        : null,
      preference === "openrouter"
        ? "Free path active (OpenRouter). For XPRIZE later: get a free Gemini quota key and set AI_PROVIDER_PREFERENCE=auto"
        : null,
      !gemini
        ? "Optional for XPRIZE: Set GEMINI_API_KEY (https://aistudio.google.com/apikey) — free tier, no payment required when quota is available"
        : gemini && preference === "openrouter"
          ? "Gemini key is set but skipped — change AI_PROVIDER_PREFERENCE=auto to use it"
          : null,
      !gcp
        ? "Set FIREBASE_DATABASE_URL (Firebase Spark free — console → Realtime Database)"
        : null,
    ].filter(Boolean),
  });
}
