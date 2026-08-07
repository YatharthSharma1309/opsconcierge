"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnalyzeButton } from "@/components/recruitment/analyze-button";
import { CandidateStatusBadge } from "@/components/recruitment/candidate-status-badge";
import { getPipelineActions } from "@/lib/recruitment/candidate-actions";
import { getStatusChangeConfirmation } from "@/lib/recruitment/pipeline-confirmations";
import type { CandidateDetailDTO, CandidateStatus } from "@/lib/recruitment/types";

type CandidateDetailPanelProps = {
  candidate: CandidateDetailDTO;
  otherCandidateCount: number;
};

export function CandidateDetailPanel({
  candidate,
  otherCandidateCount,
}: CandidateDetailPanelProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(candidate.notes ?? "");
  const [resumeText, setResumeText] = useState(candidate.rawText ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const needsResumeText =
    candidate.parseStatus === "failed" || candidate.rawText.trim().length < 50;

  async function updateCandidate(body: Record<string, unknown>) {
    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/recruitment/candidates/${candidate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Update failed");
        return false;
      }

      if (body.status === "hired") {
        router.push(`/recruitment/jobs/${candidate.jobId}`);
        return true;
      }

      router.refresh();
      return true;
    } catch {
      setError("Network error — please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleStatusChange(nextStatus: CandidateStatus) {
    const confirmation = getStatusChangeConfirmation({
      nextStatus,
      displayName: candidate.displayName,
      otherCandidateCount,
    });

    if (confirmation && !window.confirm(confirmation)) {
      return;
    }

    await updateCandidate({ status: nextStatus });
  }

  async function handleSaveNotes() {
    await updateCandidate({ notes: notes.trim() || null });
  }

  async function handleSaveResumeText() {
    if (resumeText.trim().length < 50) {
      setError("Paste at least 50 characters of resume text before saving.");
      return;
    }
    await updateCandidate({ rawText: resumeText.trim() });
  }

  const pipelineActions = getPipelineActions(candidate.status);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <CandidateStatusBadge status={candidate.status} />
        <AnalyzeButton
          candidateId={candidate.id}
          parseStatus={candidate.parseStatus}
          hasAnalysis={candidate.hasAnalysis}
        />
      </div>

      {pipelineActions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {pipelineActions.map((action) => (
            <Button
              key={action.nextStatus}
              type="button"
              variant={action.tone === "danger" ? "danger" : action.tone === "secondary" ? "secondary" : "primary"}
              size="sm"
              disabled={busy}
              onClick={() => handleStatusChange(action.nextStatus)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}

      {needsResumeText ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <label htmlFor="candidate-resume-text" className="mb-2 block text-sm font-medium text-amber-950">
            Paste resume text
          </label>
          <p className="mb-3 text-xs leading-5 text-amber-900/80">
            Parsing failed or text is too short. Paste the resume content here, then run analysis.
          </p>
          <Textarea
            id="candidate-resume-text"
            value={resumeText}
            onChange={(event) => setResumeText(event.target.value)}
            rows={8}
            placeholder="Paste full resume text..."
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-2"
            disabled={busy}
            onClick={handleSaveResumeText}
          >
            {busy ? "Saving..." : "Save resume text"}
          </Button>
        </div>
      ) : null}

      <div>
        <label htmlFor="candidate-notes" className="mb-2 block text-sm font-medium text-slate-700">
          Notes
        </label>
        <Textarea
          id="candidate-notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="Interview feedback, follow-up items..."
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-2"
          disabled={busy}
          onClick={handleSaveNotes}
        >
          {busy ? "Saving..." : "Save notes"}
        </Button>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
