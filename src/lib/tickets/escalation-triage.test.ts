import { describe, expect, it } from "vitest";
import { heuristicEscalationTriage } from "./escalation-triage";

describe("heuristicEscalationTriage", () => {
  it("classifies the latest question instead of an earlier refund", () => {
    const transcript = [
      "user: What is the refund policy?",
      "assistant: Full refunds are available within 14 days of purchase.",
      "user: What is your Austin office street address?",
    ].join("\n\n");

    const triage = heuristicEscalationTriage(
      "Escalation: What is your Austin office street address?",
      transcript,
    );

    expect(triage.category).toBe("other");
    expect(triage.reasonCode).toBe("needs_human");
  });

  it("still treats the latest refund question as billing", () => {
    const triage = heuristicEscalationTriage(
      "Escalation: Can I get a refund for last month's invoice?",
      "user: Can I get a refund for last month's invoice?",
    );

    expect(triage.category).toBe("billing");
  });

  it("keeps a safety issue from the transcript even when the title is ordinary", () => {
    const triage = heuristicEscalationTriage(
      "Escalation: Please call me",
      "user: There is a gas smell in the kitchen",
    );

    expect(triage.category).toBe("safety");
    expect(triage.priority).toBe("URGENT");
  });
});
