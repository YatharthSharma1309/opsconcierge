import { PLANS, proHeavyMonthUsd, tokenCostUsd } from "@/lib/billing/plans";

export type ModelUsage = {
  inputTokens: number;
  outputTokens: number;
};

export type GeminiUsageMetadata = {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  thoughtsTokenCount?: number;
};

/** Thinking tokens are billed as output on Gemini 3.5 Flash. */
export function usageFromGeminiMetadata(
  metadata: GeminiUsageMetadata | null | undefined,
): ModelUsage | null {
  if (!metadata) return null;
  const inputTokens = metadata.promptTokenCount ?? 0;
  const outputTokens =
    (metadata.candidatesTokenCount ?? 0) + (metadata.thoughtsTokenCount ?? 0);
  if (inputTokens === 0 && outputTokens === 0) return null;
  return { inputTokens, outputTokens };
}

export function usageFromProviderCounts(
  inputTokens: number | null | undefined,
  outputTokens: number | null | undefined,
): ModelUsage | null {
  const input = inputTokens ?? 0;
  const output = outputTokens ?? 0;
  if (input === 0 && output === 0) return null;
  return { inputTokens: input, outputTokens: output };
}

export function runCostUsd(usage: ModelUsage) {
  return tokenCostUsd(usage.inputTokens, usage.outputTokens);
}

/** Token budgets used when a live key has not returned usageMetadata yet. */
export const ESTIMATED_RUNS = {
  widgetAnswerHeavy: { inputTokens: 3_000, outputTokens: 8_000 },
  widgetAnswerShort: { inputTokens: 1_500, outputTokens: 800 },
  resumeScreenHeavy: { inputTokens: 8_000, outputTokens: 4_000 },
} as const satisfies Record<string, ModelUsage>;

export function phase3CostTable() {
  const widgetHeavy = runCostUsd(ESTIMATED_RUNS.widgetAnswerHeavy);
  const widgetShort = runCostUsd(ESTIMATED_RUNS.widgetAnswerShort);
  const screen = runCostUsd(ESTIMATED_RUNS.resumeScreenHeavy);
  const proMonth = proHeavyMonthUsd();

  return {
    widgetAnswerHeavyUsd: widgetHeavy,
    widgetAnswerShortUsd: widgetShort,
    escalationUsd: widgetShort * 2,
    resumeScreenHeavyUsd: screen,
    hiringSprint20Usd: screen * 20,
    proHeavyMonthUsd: proMonth,
    proPriceUsd: PLANS.pro.priceUsd,
    proMonthClearsPrice: proMonth < PLANS.pro.priceUsd,
  };
}
