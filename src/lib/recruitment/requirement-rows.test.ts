import { describe, expect, it } from "vitest";
import {
  buildRequirementRows,
  countAddressedRequirements,
  quoteContradictsSkill,
} from "./requirement-rows";

describe("buildRequirementRows", () => {
  it("keeps the job's required skills in order and labels the evidence", () => {
    const rows = buildRequirementRows({
      requiredSkills: ["React", "GraphQL", "Kubernetes"],
      breakdown: {
        matchedRequiredSkills: ["React"],
        missingRequiredSkills: ["GraphQL", "Kubernetes"],
        requiredSkillEvidence: [
          {
            skill: "React",
            evidence: "Led the React design system.",
            confidence: 0.9,
            matchType: "exact",
          },
          {
            skill: "GraphQL",
            evidence: "Mentioned adjacent API work.",
            confidence: 0.4,
            matchType: "inferred",
          },
        ],
      },
    });

    expect(rows.map((row) => row.skill)).toEqual(["React", "GraphQL", "Kubernetes"]);
    expect(rows[0]).toMatchObject({ verdict: "shown", evidence: "Led the React design system." });
    expect(rows[1]).toMatchObject({ verdict: "inferred" });
    expect(rows[2]).toMatchObject({ verdict: "not_shown", evidence: null });
    expect(countAddressedRequirements(rows)).toBe(2);
  });

  it("matches an evidence skill that contains the requirement name", () => {
    const rows = buildRequirementRows({
      requiredSkills: ["PostgreSQL"],
      breakdown: {
        matchedRequiredSkills: ["PostgreSQL"],
        missingRequiredSkills: [],
        requiredSkillEvidence: [
          {
            skill: "Postgres databases",
            evidence: "Ran Postgres in production.",
            confidence: 0.8,
            matchType: "semantic",
          },
        ],
      },
    });

    expect(rows[0]).toMatchObject({
      verdict: "shown",
      evidence: "Ran Postgres in production.",
    });
  });

  it("marks a matched skill without a quote as unverified", () => {
    const rows = buildRequirementRows({
      requiredSkills: ["SQL"],
      breakdown: {
        matchedRequiredSkills: ["SQL"],
        missingRequiredSkills: [],
        requiredSkillEvidence: [],
      },
    });

    expect(rows[0]?.verdict).toBe("unverified");
  });

  it("keeps a denial next to the requirement instead of calling it shown", () => {
    const rows = buildRequirementRows({
      requiredSkills: ["PostgreSQL"],
      breakdown: {
        matchedRequiredSkills: ["PostgreSQL"],
        missingRequiredSkills: [],
        requiredSkillEvidence: [
          {
            skill: "PostgreSQL",
            evidence: "No PostgreSQL experience. Used MySQL for reporting.",
            confidence: 0.9,
            matchType: "exact",
          },
        ],
      },
    });

    expect(quoteContradictsSkill("PostgreSQL", "No PostgreSQL experience.")).toBe(true);
    expect(rows[0]).toMatchObject({
      verdict: "contradictory",
      evidence: "No PostgreSQL experience. Used MySQL for reporting.",
    });
    expect(countAddressedRequirements(rows)).toBe(0);
  });

  it("does not treat 'not only' as a denial", () => {
    expect(
      quoteContradictsSkill("React", "Not only React, but also the design system."),
    ).toBe(false);
  });
});
