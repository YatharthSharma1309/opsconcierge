"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  MessageSquare,
  Ticket,
  Upload,
} from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DemoStepId =
  | "knowledge"
  | "widget"
  | "escalate"
  | "logs"
  | "hiring";

type DemoStep = {
  id: DemoStepId;
  step: string;
  title: string;
  body: string;
  action: string;
  tip: string;
  href: string;
  cta: string;
};

type ProductDemoWalkthroughProps = {
  demoMode?: boolean;
  className?: string;
};

function buildSteps(demoMode: boolean): DemoStep[] {
  return [
    {
      id: "knowledge",
      step: "01",
      title: "Load your company memory",
      body: "Upload an FAQ, refund policy, or hours doc — or load sample data so answers are grounded in your policies, not generic AI.",
      action: demoMode
        ? "Open the command center and click Load sample data if the workspace looks empty."
        : "After signup, upload one FAQ from Knowledge, or load sample data.",
      tip: "Start with password, billing, and returns — the questions that clog email every week.",
      href: demoMode ? "/dashboard" : "/sign-up",
      cta: demoMode ? "Open command center" : "Get started free",
    },
    {
      id: "widget",
      step: "02",
      title: "Ask on the support widget",
      body: "Open the site bubble and ask a real FAQ. The reply should cite your uploaded policy — that is deflection working.",
      action: 'Try: "What is the refund policy?" or "How do I reset my password?"',
      tip: "If sources appear under the answer, the knowledge base is connected.",
      href: demoMode ? "/widget" : "/sign-up",
      cta: demoMode ? "Open support widget" : "Get started free",
    },
    {
      id: "escalate",
      step: "03",
      title: "Escalate with the transcript",
      body: "When AI cannot resolve the case, contact support. The ticket keeps the full chat so nobody repeats themselves.",
      action: demoMode
        ? "In the widget, add a follow-up email and click Contact support."
        : "From chat or the widget, escalate to create a ticket with history attached.",
      tip: "This is the human path — no chatbot loop, no dead end.",
      href: demoMode ? "/widget" : "/sign-up",
      cta: demoMode ? "Try escalate on widget" : "Get started free",
    },
    {
      id: "logs",
      step: "04",
      title: "Review the execution log",
      body: "See model, latency, and deflect vs escalate. Use failed answers to fix the FAQ so the bot improves next week.",
      action: "Open Widget intake and inspect the latest run after you escalate.",
      tip: "Owners and judges use this trail to trust what the AI did.",
      href: demoMode ? "/widget/intake" : "/sign-up",
      cta: demoMode ? "Open execution logs" : "Get started free",
    },
    {
      id: "hiring",
      step: "05",
      title: "Shortlist a hire (optional)",
      body: "Same ops desk ranks resume PDFs against must-haves with why / why-not evidence. You still decide hire or reject.",
      action: demoMode
        ? "Open Hiring lane and open a scored demo candidate."
        : "Create a job, upload resumes, and run AI match assist.",
      tip: "You still post jobs on Indeed — OpsConcierge is the screening inbox.",
      href: demoMode ? "/recruitment" : "/sign-up",
      cta: demoMode ? "Open hiring lane" : "Get started free",
    },
  ];
}

export function ProductDemoWalkthrough({
  demoMode = false,
  className,
}: ProductDemoWalkthroughProps) {
  const steps = buildSteps(demoMode);
  const [activeId, setActiveId] = useState<DemoStepId>("knowledge");
  const active = steps.find((step) => step.id === activeId) ?? steps[0];
  const activeIndex = steps.findIndex((step) => step.id === activeId);

  return (
    <section
      id="try-demo"
      className={cn(
        "scroll-mt-20 border-b border-slate-200/80 bg-white",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Interactive demo
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            How to make it work — in five steps
          </h2>
          <p className="mt-2 text-slate-600">
            Follow the same path a founder uses in week one: knowledge → widget
            → escalate → logs → optional hiring.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12">
          <ol className="space-y-2" aria-label="Demo steps">
            {steps.map((step, index) => {
              const selected = step.id === activeId;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    aria-current={selected ? "step" : undefined}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-[border-color,background-color,box-shadow] duration-200",
                      selected
                        ? "border-primary/20 bg-primary-soft/60 shadow-sm"
                        : "border-transparent bg-foreground/[0.04] hover:border-slate-200 hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                        selected
                          ? "bg-primary text-white"
                          : index < activeIndex
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-white text-slate-500 ring-1 ring-slate-200",
                      )}
                    >
                      {step.step}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-900">
                        {step.title}
                      </span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-500 line-clamp-2">
                        {step.body}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)]">
            <div className="border-b border-slate-100 bg-gradient-to-b from-primary-soft/70 to-surface px-5 py-5 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Step {active.step}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{active.body}</p>
            </div>

            <div className="border-b border-slate-100 bg-surface px-5 py-5 sm:px-6">
              <StepPreview stepId={active.id} />
            </div>

            <div className="space-y-4 px-5 py-5 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Do this now
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{active.action}</p>
              </div>
              <p className="rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5 text-xs leading-5 text-amber-900">
                Tip: {active.tip}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href={active.href} className={buttonClassName()}>
                  {active.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {activeIndex < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveId(steps[activeIndex + 1].id)}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                  >
                    Next step
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepPreview({ stepId }: { stepId: DemoStepId }) {
  switch (stepId) {
    case "knowledge":
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Knowledge base
            </p>
            <BookOpen className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="mx-3 mt-3 flex flex-col items-center rounded-xl border-2 border-dashed border-primary/20 bg-primary-soft/40 px-3 py-4">
            <Upload className="h-5 w-5 text-primary" />
            <p className="mt-2 text-xs font-medium text-slate-700">
              Drop FAQ.md or load sample data
            </p>
          </div>
          <ul className="mt-3 space-y-1.5 px-3 pb-3">
            {["support-faq.txt", "refund-policy.pdf"].map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-2.5 py-2"
              >
                <FileText className="h-3.5 w-3.5 text-primary" />
                <span className="truncate text-xs font-medium text-slate-800">
                  {name}
                </span>
                <span className="ml-auto rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Ready
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "widget":
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="ml-2 text-[10px] text-slate-400">yourstore.com</span>
          </div>
          <div className="relative px-3 py-3">
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs leading-5 text-white">
              What is your refund policy?
            </div>
            <div className="mt-2 max-w-[92%] rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="text-xs leading-5 text-slate-700">
                Annual plans can be refunded within 14 days if usage stays under
                demo limits.
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-primary">
                <FileText className="h-2.5 w-2.5" />
                support-faq.txt · cited
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-2.5 py-1.5">
              <span className="text-[10px] font-medium text-emerald-900">
                Deflected · no ticket
              </span>
              <MessageSquare className="h-3.5 w-3.5 text-emerald-700" />
            </div>
          </div>
        </div>
      );
    case "escalate":
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <div className="flex items-center gap-2">
              <Ticket className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-semibold text-slate-900">Ticket #1042</p>
            </div>
            <span className="rounded-lg bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 ring-1 ring-amber-100">
              Open
            </span>
          </div>
          <div className="space-y-1.5 px-3 py-2.5">
            <div className="ml-4 rounded-md bg-primary-soft px-2 py-1 text-[10px] leading-4 text-primary">
              customer: Card failed on renew — need a human
            </div>
            <div className="mr-4 rounded-lg bg-slate-50 px-2 py-1 text-[10px] leading-4 text-slate-700">
              bot: I found billing FAQ, but this may need an exception.
            </div>
          </div>
          <div className="border-t border-primary/15 bg-primary-soft/50 px-3 py-2 text-[10px] font-medium text-primary">
            Transcript attached · email captured for follow-up
          </div>
        </div>
      );
    case "logs":
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Execution log
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Lane", value: "Support · widget_intake" },
              { label: "Decision", value: "Escalated" },
              { label: "Latency", value: "847ms" },
              { label: "Source", value: "Policy §2 cited" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-3 py-2 text-xs"
              >
                <span className="text-slate-500">{row.label}</span>
                <span className="font-medium text-slate-800">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "hiring":
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Candidate match
            </p>
            <Briefcase className="h-3.5 w-3.5 text-teal-700" />
          </div>
          <div className="px-3 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Alex Rivera</p>
              <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
                88
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-600">
              Matches TypeScript, Next.js, PostgreSQL — evidence quotes from the
              resume.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["TypeScript", "Next.js", "RAG"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
  }
}
