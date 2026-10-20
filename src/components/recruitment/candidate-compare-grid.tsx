import Link from "next/link";
import { CandidateStatusBadge } from "@/components/recruitment/candidate-status-badge";
import { RequirementChecklist } from "@/components/recruitment/requirement-checklist";
import { ScoreBadge } from "@/components/recruitment/score-badge";
import { Card } from "@/components/ui/card";
import { buildRequirementRows, resumeExcerpt } from "@/lib/recruitment/requirement-rows";
import type { CandidateDetailDTO } from "@/lib/recruitment/types";
import { cn } from "@/lib/utils";

type CandidateCompareGridProps = {
  jobId: string;
  requiredSkills: string[];
  candidates: CandidateDetailDTO[];
  candidateHref?: (candidateId: string) => string;
};

export function CandidateCompareGrid({
  jobId,
  requiredSkills,
  candidates,
  candidateHref = (candidateId) =>
    `/recruitment/jobs/${jobId}/candidates/${candidateId}`,
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
        const rows = analysis
          ? buildRequirementRows({
              requiredSkills,
              breakdown: analysis.scoreBreakdown,
            })
          : [];
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
                  href={candidateHref(candidate.id)}
                  className="text-base font-semibold text-primary hover:underline"
                >
                  {candidate.displayName}
                </Link>
                <div className="mt-2">
                  <CandidateStatusBadge status={candidate.status} />
                </div>
                {isLeader ? (
                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    Highest criteria review in this set
                  </p>
                ) : null}
              </div>
              <ScoreBadge score={candidate.matchScore} labeled />
            </div>

            {analysis ? (
              <>
                <p className="text-sm leading-6 text-slate-800">
                  {analysis.matchRationale}
                </p>

                {rows.length > 0 ? (
                  <RequirementChecklist rows={rows} />
                ) : null}

                {candidate.rawText ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Resume excerpt
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {resumeExcerpt(candidate.rawText)}
                    </p>
                  </div>
                ) : null}

                {analysis.scoreBreakdown ? (
                  <dl className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-600">
                    <div>
                      <dt>Required skills</dt>
                      <dd className="font-semibold text-slate-900">
                        {analysis.scoreBreakdown.requiredSkills}
                      </dd>
                    </div>
                    <div>
                      <dt>Preferred</dt>
                      <dd className="font-semibold text-slate-900">
                        {analysis.scoreBreakdown.preferredSkills}
                      </dd>
                    </div>
                    <div>
                      <dt>Experience</dt>
                      <dd className="font-semibold text-slate-900">
                        {analysis.scoreBreakdown.experience}
                      </dd>
                    </div>
                    <div>
                      <dt>Role fit</dt>
                      <dd className="font-semibold text-slate-900">
                        {analysis.scoreBreakdown.roleAlignment}
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
