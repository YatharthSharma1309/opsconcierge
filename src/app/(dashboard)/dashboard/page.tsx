import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  ClipboardList,
  Headphones,
  MessageSquare,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { SetupHealthCard } from "@/components/dashboard/setup-health-card";
import { GettingStartedWorkflow } from "@/components/dashboard/getting-started-workflow";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { getWorkspaceHealth } from "@/lib/demo";
import { db } from "@/lib/db";
import { isAiConfigured, isEmbeddingEnabled } from "@/lib/ai";
import { RelativeTime } from "@/components/ui/relative-time";
import { cn } from "@/lib/utils";

async function getDashboardData(organizationId: string) {
  const [health, documents, recentTickets] = await Promise.all([
    getWorkspaceHealth(organizationId),
    db.document.count({ where: { organizationId } }),
    db.ticket.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return { documents, ...health, recentTickets };
}

export default async function DashboardPage() {
  const { organization } = await requireOrgMembershipOrRedirect();
  const data = await getDashboardData(organization.id);
  const aiConfigured = isAiConfigured();

  return (
    <>
      <Header
        title="Overview"
        description={`Start here — support health for ${organization.name}.`}
        readyDocuments={data.readyDocuments}
        aiConfigured={aiConfigured}
        action={
          <Link href="/widget" className={buttonClassName({ size: "sm" })}>
            Try the widget
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <main id="main-content" className="flex-1 space-y-6 px-4 py-6 sm:p-6 lg:p-8">
        {/* Star next step for judges / first visit */}
        <section className="rounded-2xl border border-primary/15 bg-primary-soft/60 px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Next step
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
            Ask the support widget, then escalate once
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Prove FAQ deflection, create a ticket with the transcript, then open
            the execution run storyboard — the judge path in three clicks.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/widget" className={buttonClassName()}>
              <MessageSquare className="h-4 w-4" />
              Open widget
            </Link>
            <Link
              href="/widget/intake"
              className={buttonClassName({ variant: "secondary" })}
            >
              <ClipboardList className="h-4 w-4" />
              Execution runs
            </Link>
            <Link
              href="/recruitment"
              className={buttonClassName({ variant: "ghost" })}
            >
              Hiring lane
            </Link>
          </div>
        </section>

        <SetupHealthCard
          readyDocuments={data.readyDocuments}
          conversations={data.conversations}
          aiConfigured={aiConfigured}
          embeddingEnabled={isEmbeddingEnabled()}
        />

        {/* Compact queue summary — progressive disclosure vs equal stat cards */}
        <section className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Open tickets",
              value: data.openTickets,
              href: "/tickets",
              icon: Headphones,
            },
            {
              label: "Knowledge docs",
              value: data.documents,
              href: "/knowledge",
              icon: BookOpen,
            },
            {
              label: "Conversations",
              value: data.conversations,
              href: "/inbox",
              icon: Bot,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3.5 transition",
                  "hover:border-primary/25 hover:bg-primary-soft/40",
                )}
              >
                <div>
                  <p className="text-xs font-medium text-muted">{item.label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                    {item.value}
                  </p>
                </div>
                <Icon className="h-5 w-5 text-muted" aria-hidden />
              </Link>
            );
          })}
        </section>

        <GettingStartedWorkflow />

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardTitle>Recent tickets</CardTitle>
            <CardDescription>
              Latest issues — open one to see the operator brief after escalate.
            </CardDescription>
            <div className="mt-5">
              {data.recentTickets.length === 0 ? (
                <EmptyState
                  icon={Headphones}
                  title="No tickets yet"
                  description="Escalate from the widget or create a ticket manually."
                  action={
                    <Link
                      href="/widget"
                      className={buttonClassName({ size: "sm" })}
                    >
                      Open widget
                    </Link>
                  }
                  className="py-8"
                />
              ) : (
                <ul className="divide-y divide-border">
                  {data.recentTickets.map((ticket) => (
                    <li key={ticket.id}>
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="group -mx-2 flex items-center justify-between gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-foreground/[0.05] focus-visible:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {ticket.title}
                          </p>
                          <p className="text-xs text-muted">
                            {ticket.status.replace("_", " ").toLowerCase()}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted">
                          <RelativeTime date={ticket.createdAt} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          <Card>
            <CardTitle>AI engine</CardTitle>
            <CardDescription>
              {data.readyDocuments
                ? aiConfigured
                  ? "Gemini / OpenRouter ready for grounded answers."
                  : "Keyword fallback — add an API key for full RAG chat."
                : "Upload knowledge docs before expecting strong deflection."}
            </CardDescription>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/knowledge"
                className={buttonClassName({ variant: "secondary" })}
              >
                Knowledge base
              </Link>
              <Link
                href="/analytics"
                className={buttonClassName({ variant: "ghost" })}
              >
                Analytics
              </Link>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
