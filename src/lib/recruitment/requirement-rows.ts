import type { EvidenceMatch, RequirementRow, ScoreBreakdown } from "@/lib/recruitment/types";

function skillKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bjavascript\b/g, "js")
    .replace(/\btypescript\b/g, "ts")
    .replace(/\bnode\.?js\b/g, "node")
    .replace(/\bnext\.?js\b/g, "next")
    .replace(/\breact\.?js\b/g, "react")
    .replace(/\bpostgresql\b/g, "postgres")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim();
}

function listed(skill: string, names: string[]): boolean {
  const target = skillKey(skill);
  return names.some((name) => skillKey(name) === target);
}

function skillsMatch(requirement: string, evidenceSkill: string): boolean {
  const left = skillKey(requirement);
  const right = skillKey(evidenceSkill);
  if (!left || !right) return false;
  if (left === right) return true;
  if (left.length >= 4 && right.length >= 4 && (left.includes(right) || right.includes(left))) {
    return true;
  }
  return false;
}

function findEvidence(
  skill: string,
  evidence: EvidenceMatch[],
): EvidenceMatch | undefined {
  return evidence.find((item) => skillsMatch(skill, item.skill));
}

export function buildRequirementRows(input: {
  requiredSkills: string[];
  breakdown: Pick<
    ScoreBreakdown,
    "matchedRequiredSkills" | "missingRequiredSkills" | "requiredSkillEvidence"
  > | null;
}): RequirementRow[] {
  const evidence = input.breakdown?.requiredSkillEvidence ?? [];
  const matched = input.breakdown?.matchedRequiredSkills ?? [];
  const missing = input.breakdown?.missingRequiredSkills ?? [];
  const skills =
    input.requiredSkills.length > 0
      ? input.requiredSkills
      : [
          ...matched,
          ...missing.filter((skill) => !listed(skill, matched)),
        ];

  return skills.map((skill) => {
    const match = findEvidence(skill, evidence);
    const quote = match?.evidence?.trim() || null;

    if (match && (match.matchType === "exact" || match.matchType === "semantic")) {
      return { skill, verdict: "shown", evidence: quote };
    }

    if (match?.matchType === "inferred") {
      return { skill, verdict: "inferred", evidence: quote };
    }

    if (listed(skill, matched)) {
      return { skill, verdict: "unverified", evidence: quote };
    }

    return { skill, verdict: "not_shown", evidence: null };
  });
}

export function countAddressedRequirements(rows: RequirementRow[]): number {
  return rows.filter((row) => row.verdict !== "not_shown").length;
}

export function resumeExcerpt(text: string, max = 280): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trim()}…`;
}
