import Link from "next/link";
import { CandidateStatusBadge } from "@/components/recruitment/candidate-status-badge";
import { ScoreBadge } from "@/components/recruitment/score-badge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CandidateDetailDTO } from "@/lib/recruitment/types";
import { cn } from "@/lib/utils";

type CandidateCompareGridProps = {
  jobId: string;
  candidates: CandidateDetailDTO[];
};

function SkillList({
  skills,
  empty,
  tone = "default",
}: {
  skills: string[];
  empty: string;
  tone?: "default" | "success" | "danger" | "info";
}) {
  if (skills.length === 0) {
    return <p className="text-sm text-slate-400">{empty}</p>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <Badge key={skill} tone={tone}>
          {skill}
        </Badge>
      ))}
    </div>
  );
}

export function CandidateCompareGrid({
  jobId,
  candidates,
}: CandidateCompareGridProps) {
  const ranked = [...candidates].sort(
    (a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1),
  );
  const leaderId = ranked[0]?.id ?? null;

  return (
    <div
      className={cn(
        "grid gap-4",
        candidates.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3",
      )}
    >
      {candidates.map((candidate) => {
        const analysis = candidate.analysis;
        const breakdown = analysis?.scoreBreakdown;
        const matchedRequired = breakdown?.matchedRequiredSkills ?? [];
        const missingRequired =
          breakdown?.missingRequiredSkills ?? analysis?.missingSkills ?? [];
        const matchedPreferred = breakdown?.matchedPreferredSkills ?? [];
        const isLeader = candidate.id === leaderId;

        return (
          <Card
            key={candidate.id}
            className={cn(
              "flex flex-col gap-4",
              isLeader && "ring-2 ring-emerald-200",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/recruitment/jobs/${jobId}/candidates/${candidate.id}`}
                  className="text-base font-semibold text-teal-800 hover:text-teal-700"
                >
                  {candidate.displayName}
                </Link>
                <div className="mt-2">
                  <CandidateStatusBadge status={candidate.status} />
                </div>
                {isLeader ? (
                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    Highest match in this set
                  </p>
                ) : null}
              </div>
              <ScoreBadge score={candidate.matchScore} />
            </div>

            {analysis ? (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Summary
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {analysis.summary}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Match rationale
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {analysis.matchRationale}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Matched required
                  </p>
                  <div className="mt-2">
                    <SkillList
                      skills={matchedRequired}
                      empty="None matched"
                      tone="success"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Missing required
                  </p>
                  <div className="mt-2">
                    <SkillList
                      skills={missingRequired}
                      empty="No gaps called out"
                      tone="danger"
                    />
                  </div>
                </div>

                {matchedPreferred.length > 0 ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Matched preferred
                    </p>
                    <div className="mt-2">
                      <SkillList
                        skills={matchedPreferred}
                        empty="None"
                        tone="info"
                      />
                    </div>
                  </div>
                ) : null}

                {breakdown ? (
                  <dl className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-600">
                    <div>
                      <dt>Required skills</dt>
                      <dd className="font-semibold text-slate-900">
                        {breakdown.requiredSkills}
                      </dd>
                    </div>
                    <div>
                      <dt>Preferred</dt>
                      <dd className="font-semibold text-slate-900">
                        {breakdown.preferredSkills}
                      </dd>
                    </div>
                    <div>
                      <dt>Experience</dt>
                      <dd className="font-semibold text-slate-900">
                        {breakdown.experience}
                      </dd>
                    </div>
                    <div>
                      <dt>Role fit</dt>
                      <dd className="font-semibold text-slate-900">
                        {breakdown.roleAlignment}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-amber-700">
                This candidate has not been analyzed yet.
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
