import { describe, expect, it } from "vitest";
import { phase3CostTable, runCostUsd, usageFromGeminiMetadata } from "@/lib/billing/cost";

describe("model cost", () => {
  it("bills Gemini thinking tokens as output", () => {
    expect(
      usageFromGeminiMetadata({
        promptTokenCount: 1_000,
        candidatesTokenCount: 200,
        thoughtsTokenCount: 800,
      }),
    ).toEqual({ inputTokens: 1_000, outputTokens: 1_000 });
  });

  it("prices a heavy widget answer under ten cents", () => {
    const table = phase3CostTable();
    expect(table.widgetAnswerHeavyUsd).toBeCloseTo(0.0765, 4);
    expect(table.widgetAnswerHeavyUsd).toBeLessThan(0.1);
  });

  it("prices one escalation as the answer plus a short triage call", () => {
    const table = phase3CostTable();
    expect(table.escalationUsd).toBeCloseTo(table.widgetAnswerShortUsd * 2, 6);
  });

  it("keeps a 20-resume sprint and a heavy Pro month inside $39", () => {
    const table = phase3CostTable();
    expect(table.hiringSprint20Usd).toBeLessThan(2);
    expect(table.proMonthClearsPrice).toBe(true);
    expect(table.proHeavyMonthUsd).toBeLessThan(table.proPriceUsd);
  });

  it("returns null when the provider sent no token counts", () => {
    expect(usageFromGeminiMetadata(null)).toBeNull();
    expect(usageFromGeminiMetadata({})).toBeNull();
    expect(runCostUsd({ inputTokens: 0, outputTokens: 0 })).toBe(0);
  });
});
