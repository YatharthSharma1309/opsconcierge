import Link from "next/link";
import { Header } from "@/components/layout/header";
import { ExecutionLogTable } from "@/components/execution/execution-log-table";
import { WidgetIntakeRunSelector } from "@/components/execution/widget-intake-run-selector";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { db } from "@/lib/db";
import { Inbox } from "lucide-react";

export default async function WidgetIntakePage() {
  const { organization } = await requireOrgMembershipOrRedirect();

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

  const latestRun = runs[0] ?? null;

  const logs = latestRun
    ? await db.executionLogEntry.findMany({
        where: { runId: latestRun.id },
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
      })
    : [];

  return (
    <>
      <Header
        title="Widget intake demo"
        description="Widget intake -> lane routing -> Gemini -> ticket update. Execution log rows are screenshot-friendly."
        action={
          latestRun ? (
            <Link href={`/widget/intake/${latestRun.id}`}>
              <Button size="sm" variant="secondary">
                Open selected run
              </Button>
            </Link>
          ) : null
        }
      />

      <main id="main-content" className="flex-1 space-y-6 px-4 py-6 sm:p-6 lg:p-8">
        {runs.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No widget runs yet"
            description="Send a message via the embedded widget, then escalate to a ticket. Execution log rows appear here."
            action={
              <Link href="/widget">
                <Button size="sm">Preview widget</Button>
              </Link>
            }
            className="py-8"
          />
        ) : (
          <div className="space-y-6">
            <Card className="p-6">
              <WidgetIntakeRunSelector
                runs={runs}
                selectedRunId={latestRun!.id}
              />
            </Card>

            <Card className="p-6">
              <ExecutionLogTable logs={logs} />
            </Card>
          </div>
        )}
      </main>
    </>
  );
}

