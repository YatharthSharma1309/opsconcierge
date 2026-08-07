import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Circle,
  ClipboardList,
  Headphones,
  MessageSquare,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { SetupHealthCard } from "@/components/dashboard/setup-health-card";
import { GettingStartedWorkflow } from "@/components/dashboard/getting-started-workflow";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { requireOrgMembershipOrRedirect } from "@/lib/auth";
import { getWorkspaceHealth } from "@/lib/demo";
import { db } from "@/lib/db";
import {
  getAiProviderPreference,
  getChatModel,
  isAiConfigured,
  isEmbeddingEnabled,
  isOpenRouterConfigured,
  shouldAttemptGemini,
} from "@/lib/ai";
import { getGeminiChatModel, isGeminiConfigured } from "@/lib/gemini";
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
  const embeddingEnabled = isEmbeddingEnabled();
  const geminiReady = isGeminiConfigured();
  const openRouterReady = isOpenRouterConfigured();
  const preference = getAiProviderPreference();
  const activeModel = shouldAttemptGemini()
    ? getGeminiChatModel()
    : openRouterReady
      ? getChatModel()
      : "keyword fallback";
  const providerLabel = !aiConfigured
    ? "Keyword only"
    : shouldAttemptGemini()
      ? preference === "auto" && openRouterReady
        ? "Gemini → OpenRouter"
        : "Gemini"
      : "OpenRouter";
  const engineMode = !data.readyDocuments
    ? "Setup"
    : aiConfigured
      ? shouldAttemptGemini()
        ? "Gemini"
        : "OpenRouter"
      : "Keyword";
  const engineHint = !data.readyDocuments
    ? "Upload knowledge docs first"
    : aiConfigured
      ? `Active: ${activeModel}`
      : "Works without API key";
  const quickActions = [
    { href: "/knowledge", label: "Upload documents", variant: "primary" as const },
    { href: "/chat", label: "Test chatbot", variant: "secondary" as const },
    { href: "/widget", label: "Open widget", variant: "secondary" as const },
    { href: "/analytics", label: "View analytics", variant: "secondary" as const },
  ];
  const aiEngineRows = [
    {
      label: "Provider path",
      value: providerLabel,
      done: aiConfigured,
    },
    {
      label: "Active model",
      value: activeModel,
      done: aiConfigured,
    },
    {
      label: "Retrieval",
      value: embeddingEnabled ? "Embeddings + keyword" : "Keyword (free)",
      done: true,
    },
    {
      label: "Knowledge ready",
      value:
        data.readyDocuments > 0
          ? `${data.readyDocuments} indexed doc${data.readyDocuments === 1 ? "" : "s"}`
          : "No ready docs yet",
      done: data.readyDocuments > 0,
    },
    {
      label: "Chat tested",
      value:
        data.conversations > 0
          ? `${data.conversations} conversation${data.conversations === 1 ? "" : "s"}`
          : "Not tested yet",
      done: data.conversations > 0,
    },
  ];

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
          embeddingEnabled={embeddingEnabled}
        />

        {/* Compact queue summary — includes AI Engine mode from the original 4-up */}
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
              icon: MessageSquare,
            },
            {
              label: "AI engine",
              value: engineMode,
              href: "/chat",
              icon: Bot,
              hint: engineHint,
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
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted">{item.label}</p>
                  <p className="mt-1 truncate text-2xl font-semibold tabular-nums text-foreground">
                    {item.value}
                  </p>
                  {"hint" in item && item.hint ? (
                    <p className="mt-1 truncate text-[11px] text-muted">
                      {item.hint}
                    </p>
                  ) : null}
                </div>
                <Icon className="h-5 w-5 shrink-0 text-muted" aria-hidden />
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
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>AI engine</CardTitle>
                <CardDescription>
                  Jump into core workflows, then check provider and retrieval
                  readiness.
                </CardDescription>
              </div>
              <Badge tone={aiConfigured ? "success" : "warning"}>
                {engineMode}
              </Badge>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={buttonClassName({
                    variant:
                      action.variant === "primary" ? "primary" : "secondary",
                  })}
                >
                  {action.label}
                </Link>
              ))}
            </div>

            <ul className="mt-5 divide-y divide-border rounded-xl border border-border">
              {aiEngineRows.map((row) => {
                const StatusIcon = row.done ? CheckCircle2 : Circle;
                return (
                  <li
                    key={row.label}
                    className="flex items-start gap-3 px-3.5 py-2.5"
                  >
                    <StatusIcon
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        row.done ? "text-success" : "text-muted",
                      )}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted">
                        {row.label}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                        {row.value}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 flex flex-wrap gap-2 px-0.5 text-[11px] text-muted">
              <span>
                Gemini: {geminiReady ? "configured" : "missing key"}
              </span>
              <span aria-hidden>·</span>
              <span>
                OpenRouter: {openRouterReady ? "configured" : "missing key"}
              </span>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
