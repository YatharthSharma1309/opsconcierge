import Link from "next/link";
import { Header } from "@/components/layout/header";
import { BoardSwitch } from "@/components/analytics/board-switch";
import { DemoHiringBoard } from "@/components/analytics/demo-hiring-board";
import { HiringBoardView } from "@/components/analytics/hiring-board";
import { buttonClassName } from "@/components/ui/button";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { buildHiringBoard } from "@/lib/analytics/hiring-board";
import { hiringWorkspaceHref, isPublicDemoMode } from "@/lib/env/public-demo";
import { db } from "@/lib/db";

export default async function HiringAnalyticsPage() {
  const { organization } = await requireOrgMembershipOrRedirect();

  if (isPublicDemoMode()) {
    return (
      <>
        <Header
          title="Hiring board"
          description="The sample job: Maya, Jordan, and Priya. Stages update when you shortlist in this browser."
          action={
            <Link href={hiringWorkspaceHref()} className={buttonClassName({ size: "sm" })}>
              Open hiring
            </Link>
          }
        />
        <main id="main-content" className="flex-1 space-y-4 px-4 py-6 sm:p-6 lg:p-8">
          <BoardSwitch current="hiring" />
          <DemoHiringBoard />
        </main>
      </>
    );
  }

  const candidates = await db.candidate.findMany({
    where: { job: { organizationId: organization.id } },
    select: {
      displayName: true,
      status: true,
      createdAt: true,
      analysis: { select: { matchScore: true } },
      job: { select: { title: true } },
    },
  });

  const board = buildHiringBoard(
    candidates.map((candidate) => ({
      displayName: candidate.displayName,
      status: candidate.status,
      createdAt: candidate.createdAt,
      jobTitle: candidate.job.title,
      score: candidate.analysis?.matchScore ?? null,
    })),
  );

  return (
    <>
      <Header
        title="Hiring board"
        description="Stages, criteria alignment, and who is still in play."
        action={
          <Link href={hiringWorkspaceHref()} className={buttonClassName({ size: "sm" })}>
            Open hiring
          </Link>
        }
      />
      <main id="main-content" className="flex-1 space-y-4 px-4 py-6 sm:p-6 lg:p-8">
        <BoardSwitch current="hiring" />
        <HiringBoardView board={board} />
      </main>
    </>
  );
}
