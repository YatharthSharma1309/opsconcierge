import { quoteContradictsSkill } from "@/lib/recruitment/requirement-rows";
import type { EvidenceMatch, RequirementRow } from "@/lib/recruitment/types";

export type ReviewNarrative = {
  supporting: string[];
  furtherReview: string[];
};

function shownLine(skill: string, evidence: string | null): string {
  const quote = evidence?.trim();
  if (!quote) return `The resume addresses ${skill}.`;
  if (quote.toLowerCase().includes(skill.toLowerCase())) return quote;
  return `${skill}: ${quote}`;
}

function uncertainLine(
  skill: string,
  evidence: string | null,
  kind: "inferred" | "unverified",
): string {
  const quote = evidence?.trim();
  if (kind === "unverified") {
    return quote
      ? `No quoted evidence was found for ${skill}, so this item needs a closer look. Related text: “${quote}”`
      : `No quoted evidence was found for ${skill}, so this item needs a closer look.`;
  }

  const base = `The resume suggests ${skill}, but the text does not directly establish it.`;
  return quote ? `${base} “${quote}”` : base;
}

function pushUnique(list: string[], line: string) {
  const key = line.trim().toLowerCase();
  if (!key) return;
  if (list.some((item) => item.trim().toLowerCase() === key)) return;
  list.push(line.trim());
}

export function buildReviewNarrative(input: {
  requirements: RequirementRow[];
  preferredEvidence?: EvidenceMatch[];
  experienceEvidence?: string | null;
  roleEvidence?: string | null;
}): ReviewNarrative {
  const supporting: string[] = [];
  const furtherReview: string[] = [];

  for (const row of input.requirements) {
    if (row.verdict === "shown") {
      pushUnique(supporting, shownLine(row.skill, row.evidence));
      continue;
    }

    if (row.verdict === "inferred") {
      pushUnique(furtherReview, uncertainLine(row.skill, row.evidence, "inferred"));
      continue;
    }

    if (row.verdict === "contradictory") {
      const quote = row.evidence?.trim();
      pushUnique(
        furtherReview,
        quote
          ? `The resume contradicts ${row.skill}: “${quote}”`
          : `The resume contradicts ${row.skill}.`,
      );
      continue;
    }

    if (row.verdict === "unverified") {
      pushUnique(furtherReview, uncertainLine(row.skill, row.evidence, "unverified"));
      continue;
    }

    pushUnique(furtherReview, `The resume does not establish ${row.skill}.`);
  }

  for (const match of input.preferredEvidence ?? []) {
    if (
      match.matchType === "contradictory" ||
      quoteContradictsSkill(match.skill, match.evidence)
    ) {
      pushUnique(
        furtherReview,
        `The resume contradicts ${match.skill}: “${match.evidence.trim()}”`,
      );
      continue;
    }

    if (match.matchType === "inferred") {
      pushUnique(
        furtherReview,
        uncertainLine(match.skill, match.evidence, "inferred"),
      );
      continue;
    }

    if (match.matchType === "exact" || match.matchType === "semantic") {
      pushUnique(supporting, shownLine(match.skill, match.evidence));
    }
  }

  for (const line of [input.experienceEvidence, input.roleEvidence]) {
    const trimmed = line?.trim();
    if (trimmed) pushUnique(supporting, trimmed);
  }

  return { supporting, furtherReview };
}
