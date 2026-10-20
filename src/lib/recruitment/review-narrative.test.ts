import { describe, expect, it } from "vitest";
import { buildReviewNarrative } from "./review-narrative";

describe("buildReviewNarrative", () => {
  it("treats missing resume evidence as an open question, not a missing skill", () => {
    const narrative = buildReviewNarrative({
      requirements: [
        {
          skill: "React",
          verdict: "shown",
          evidence: "Built the customer portal in React and TypeScript.",
        },
        {
          skill: "TypeScript",
          verdict: "shown",
          evidence: "Built the customer portal in React and TypeScript.",
        },
        {
          skill: "AWS",
          verdict: "not_shown",
          evidence: null,
        },
        {
          skill: "Team leadership",
          verdict: "inferred",
          evidence: "Coordinated with designers on the portal launch.",
        },
      ],
      preferredEvidence: [
        {
          skill: "FastAPI",
          evidence: "Built REST APIs with FastAPI for invoice intake.",
          confidence: 0.9,
          matchType: "exact",
        },
      ],
      experienceEvidence: "Four years building web applications.",
    });

    expect(narrative.supporting).toEqual([
      "Built the customer portal in React and TypeScript.",
      "Built REST APIs with FastAPI for invoice intake.",
      "Four years building web applications.",
    ]);
    expect(narrative.furtherReview).toEqual([
      "The resume does not establish AWS.",
      "The resume suggests Team leadership, but the text does not directly establish it. “Coordinated with designers on the portal launch.”",
    ]);
    expect(narrative.furtherReview.join(" ")).not.toMatch(/lacks|missing|does not have/i);
  });
});
