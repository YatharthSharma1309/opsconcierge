import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ExecutionLogTable } from "@/components/execution/execution-log-table";
import { WidgetIntakeRunSelector } from "@/components/execution/widget-intake-run-selector";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function WidgetIntakeRunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { organization } = await requireOrgMembershipOrRedirect();
  const { runId } = await params;

  const run = await db.executionRun.findFirst({
    where: { id: runId, workspaceId: organization.id },
  });

  if (!run) {
    notFound();
  }

  const runs = await db.executionRun.findMany({
    where: { workspaceId: organization.id, trigger: "widget_intake" },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      id: true,
      createdAt: true,
      conversationId: true,
    },
  });

  const logs = await db.executionLogEntry.findMany({
    where: { runId: run.id },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      createdAt: true,
      workspaceId: true,
      agent: true,
      trigger: true,
      model: true,
      decision: true,
      latencyMs: true,
    },
  });

  return (
    <>
      <Header
        title="Execution log"
        description="Review lane routing -> Gemini -> ticket update for the selected widget run."
        action={
          <Link href="/widget/intake">
            <Button size="sm" variant="secondary">
              Back
            </Button>
          </Link>
        }
      />

      <main id="main-content" className="flex-1 space-y-6 px-4 py-6 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <Card className="p-6">
            <WidgetIntakeRunSelector runs={runs} selectedRunId={run.id} />
          </Card>

          <Card className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-slate-500">Run details</p>
              <p className="font-mono text-xs text-slate-700">
                conversationId: {run.conversationId ?? "N/A"}
              </p>
              <p className="font-mono text-xs text-slate-700">channel: {run.channel}</p>
            </div>

            <ExecutionLogTable logs={logs} />
          </Card>
        </div>
      </main>
    </>
  );
}

