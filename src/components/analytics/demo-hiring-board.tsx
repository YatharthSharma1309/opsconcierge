"use client";

import { HiringBoardView } from "@/components/analytics/hiring-board";
import { useDemoHiring } from "@/components/recruitment/demo-hiring-provider";
import { buildHiringBoard } from "@/lib/analytics/hiring-board";
import { demoCandidates, demoHiringJob } from "@/lib/recruitment/demo-sample";

export function DemoHiringBoard() {
  const { statusFor } = useDemoHiring();
  const board = buildHiringBoard(
    demoCandidates.map((candidate) => ({
      displayName: candidate.displayName,
      status: statusFor(candidate.id, candidate.status),
      createdAt: candidate.createdAt,
      jobTitle: demoHiringJob.title,
      score: candidate.matchScore,
    })),
  );

  return <HiringBoardView board={board} />;
}
