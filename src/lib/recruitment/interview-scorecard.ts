import type { InterviewScorecard, InterviewRecommendation } from "@/lib/recruitment/types";

export const INTERVIEW_RECOMMENDATIONS = [
  "strong_yes",
  "yes",
  "maybe",
  "no",
] as const;

export const RECOMMENDATION_LABELS: Record<InterviewRecommendation, string> = {
  strong_yes: "Strong yes",
  yes: "Yes",
  maybe: "Maybe",
  no: "No",
};

function isRecommendation(value: unknown): value is InterviewRecommendation {
  return (
    typeof value === "string" &&
    (INTERVIEW_RECOMMENDATIONS as readonly string[]).includes(value)
  );
}

function clampScore(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return null;
  return Math.min(5, Math.max(1, Math.round(num)));
}

export function emptyInterviewScorecard(): InterviewScorecard {
  return {
    skillScores: [],
    questionScores: [],
    overallNotes: "",
    recommendation: null,
    updatedAt: null,
  };
}

export function parseInterviewScorecard(value: unknown): InterviewScorecard {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return emptyInterviewScorecard();
  }

  const record = value as Record<string, unknown>;
  const skillScores = Array.isArray(record.skillScores)
    ? record.skillScores
        .map((item) => {
          if (!item || typeof item !== "object" || Array.isArray(item)) return null;
          const row = item as Record<string, unknown>;
          const skill = typeof row.skill === "string" ? row.skill.trim() : "";
          if (!skill) return null;
          return {
            skill: skill.slice(0, 80),
            score: clampScore(row.score),
            notes: typeof row.notes === "string" ? row.notes.slice(0, 500) : "",
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .slice(0, 20)
    : [];

  const questionScores = Array.isArray(record.questionScores)
    ? record.questionScores
        .map((item) => {
          if (!item || typeof item !== "object" || Array.isArray(item)) return null;
          const row = item as Record<string, unknown>;
          const question =
            typeof row.question === "string" ? row.question.trim() : "";
          if (!question) return null;
          return {
            question: question.slice(0, 400),
            asked: Boolean(row.asked),
            score: clampScore(row.score),
            notes: typeof row.notes === "string" ? row.notes.slice(0, 500) : "",
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .slice(0, 12)
    : [];

  return {
    skillScores,
    questionScores,
    overallNotes:
      typeof record.overallNotes === "string"
        ? record.overallNotes.slice(0, 4000)
        : "",
    recommendation: isRecommendation(record.recommendation)
      ? record.recommendation
      : null,
    updatedAt:
      typeof record.updatedAt === "string" ? record.updatedAt : null,
  };
}

/** Merge saved scorecard with current job skills + AI interview questions. */
export function buildInterviewScorecard(
  saved: InterviewScorecard | null | undefined,
  requiredSkills: string[],
  interviewQuestions: string[],
): InterviewScorecard {
  const base = saved ?? emptyInterviewScorecard();
  const skillByKey = new Map(
    base.skillScores.map((row) => [row.skill.toLowerCase(), row]),
  );
  const questionByKey = new Map(
    base.questionScores.map((row) => [row.question.toLowerCase(), row]),
  );

  const skillScores = requiredSkills.map((skill) => {
    const existing = skillByKey.get(skill.toLowerCase());
    return (
      existing ?? {
        skill,
        score: null,
        notes: "",
      }
    );
  });

  const questionScores = interviewQuestions.map((question) => {
    const existing = questionByKey.get(question.toLowerCase());
    return (
      existing ?? {
        question,
        asked: false,
        score: null,
        notes: "",
      }
    );
  });

  const keptSkillKeys = new Set(skillScores.map((row) => row.skill.toLowerCase()));
  const keptQuestionKeys = new Set(
    questionScores.map((row) => row.question.toLowerCase()),
  );

  const orphanSkills = base.skillScores.filter(
    (row) => !keptSkillKeys.has(row.skill.toLowerCase()),
  );
  const orphanQuestions = base.questionScores.filter(
    (row) => !keptQuestionKeys.has(row.question.toLowerCase()),
  );

  return {
    ...base,
    skillScores: [...skillScores, ...orphanSkills],
    questionScores: [...questionScores, ...orphanQuestions],
  };
}

export function averageScore(scores: Array<number | null>) {
  const filled = scores.filter((score): score is number => typeof score === "number");
  if (filled.length === 0) return null;
  return Math.round((filled.reduce((sum, score) => sum + score, 0) / filled.length) * 10) / 10;
}
