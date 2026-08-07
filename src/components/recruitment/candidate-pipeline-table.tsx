"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Columns2 } from "lucide-react";
import { CandidateStatusBadge } from "@/components/recruitment/candidate-status-badge";
import { ScoreBadge } from "@/components/recruitment/score-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RelativeTime } from "@/components/ui/relative-time";
import type { CandidateDTO } from "@/lib/recruitment/types";

const MAX_COMPARE = 3;

type CandidatePipelineTableProps = {
  jobId: string;
  candidates: CandidateDTO[];
};

export function CandidatePipelineTable({
  jobId,
  candidates,
}: CandidatePipelineTableProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const analyzedSelected = useMemo(
    () =>
      selectedIds.filter((id) =>
        candidates.some((candidate) => candidate.id === id && candidate.hasAnalysis),
      ),
    [candidates, selectedIds],
  );

  function toggleCandidate(candidateId: string) {
    setSelectedIds((current) => {
      if (current.includes(candidateId)) {
        return current.filter((id) => id !== candidateId);
      }
      if (current.length >= MAX_COMPARE) {
        return current;
      }
      return [...current, candidateId];
    });
  }

  function openCompare() {
    if (analyzedSelected.length < 2) return;
    const ids = analyzedSelected.slice(0, MAX_COMPARE).join(",");
    router.push(`/recruitment/jobs/${jobId}/compare?ids=${encodeURIComponent(ids)}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Select 2–3 analyzed candidates to compare side by side.
        </p>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={analyzedSelected.length < 2}
          onClick={openCompare}
        >
          <Columns2 className="h-3.5 w-3.5" />
          Compare
          {analyzedSelected.length > 0 ? ` (${analyzedSelected.length})` : ""}
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-medium uppercase tracking-wide text-slate-500">
              <tr>
                <th className="w-10 px-4 py-3">
                  <span className="sr-only">Select</span>
                </th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Match</th>
                <th className="px-4 py-3">Parse</th>
                <th className="px-4 py-3">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidates.map((candidate) => {
                const checked = selectedIds.includes(candidate.id);
                const disabled =
                  !candidate.hasAnalysis ||
                  (!checked && selectedIds.length >= MAX_COMPARE);

                return (
                  <tr key={candidate.id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-800 disabled:opacity-40"
                        checked={checked}
                        disabled={disabled}
                        aria-label={`Select ${candidate.displayName} for compare`}
                        title={
                          !candidate.hasAnalysis
                            ? "Analyze this candidate before comparing"
                            : undefined
                        }
                        onChange={() => toggleCandidate(candidate.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/recruitment/jobs/${jobId}/candidates/${candidate.id}`}
                        className="font-medium text-blue-900 hover:text-blue-800"
                      >
                        {candidate.displayName}
                      </Link>
                      {candidate.fileName ? (
                        <p className="text-xs text-slate-400">{candidate.fileName}</p>
                      ) : null}
                      {!candidate.hasAnalysis ? (
                        <p className="text-xs text-amber-600">Needs analysis</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <CandidateStatusBadge status={candidate.status} />
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBadge score={candidate.matchScore} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        tone={
                          candidate.parseStatus === "ok" ||
                          candidate.parseStatus === "manual"
                            ? "success"
                            : candidate.parseStatus === "failed"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {candidate.parseStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      <RelativeTime date={candidate.createdAt} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
