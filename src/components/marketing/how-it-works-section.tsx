import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  MessageSquare,
  Search,
  Ticket,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type HowItWorksStep = {
  step: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Upload the docs you already have",
    body: "FAQ, refund policy, hours, billing notes — from Notion, PDF, or a plain text file.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Deflect on your website widget",
    body: "Customers ask on-site. Answers stay grounded in your policies — not generic ChatGPT.",
    icon: Search,
  },
  {
    step: "03",
    title: "Escalate with the full transcript",
    body: "One click creates a ticket with chat history. Review the execution log; fix the FAQ.",
    icon: Ticket,
  },
];

type HowItWorksSectionProps = {
  demoMode?: boolean;
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
};

export function HowItWorksSection({
  demoMode = false,
  primaryHref = "/sign-up",
  secondaryHref = "/help",
  className,
}: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className={cn(
        "scroll-mt-20 border-b border-slate-200/80 bg-slate-50",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
          <p className="mt-2 text-slate-600">
            Upload once, deflect on-site, escalate with context. No 50-agent
            helpdesk rollout.
          </p>
        </header>

        <PipelineStepper steps={HOW_IT_WORKS_STEPS} className="mt-12 hidden lg:flex" />

        <ol className="mt-10 grid gap-8 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <HowItWorksStepCard
              key={item.step}
              item={item}
              index={index}
              isLast={index === HOW_IT_WORKS_STEPS.length - 1}
            />
          ))}
        </ol>

        <div className="mt-12 rounded-2xl border border-slate-200/90 bg-white px-5 py-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-8">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              {demoMode
                ? "See the full path in the live demo"
                : "Put your FAQ to work this week"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {demoMode
                ? "Widget → escalate → execution log — no sign-in required."
                : "Upload one doc, embed the widget, measure deflection."}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0 sm:shrink-0">
            <Link
              href={demoMode ? "/widget" : primaryHref}
              className={buttonClassName()}
            >
              {demoMode ? "Support widget" : "Get started free"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={demoMode ? "/widget/intake" : secondaryHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {demoMode ? "Execution logs" : "Help center"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineStepper({
  steps,
  className,
}: {
  steps: HowItWorksStep[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <div className="absolute left-[calc(16.67%-8px)] right-[calc(16.67%-8px)] top-4 h-px bg-blue-200" />
      <ol className="relative grid grid-cols-3">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.step} className="flex flex-col items-center gap-2">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-white shadow-sm shadow-slate-900/30 ring-4 ring-slate-50">
                {item.step}
              </span>
              <Icon className="h-4 w-4 text-primary" />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function HowItWorksStepCard({
  item,
  index,
  isLast,
}: {
  item: HowItWorksStep;
  index: number;
  isLast: boolean;
}) {
  const Icon = item.icon;
  const Mockup =
    index === 0 ? UploadMockup : index === 1 ? WidgetMockup : TicketMockup;

  return (
    <li className="relative flex flex-col">
      {!isLast ? (
        <span
          className="absolute left-4 top-10 bottom-0 w-px bg-blue-200 lg:hidden"
          aria-hidden
        />
      ) : null}

      <article className="group flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-28px_rgba(15,23,42,0.35)] transition-shadow duration-200 hover:shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)]">
        <div className="border-b border-slate-100 px-5 py-5">
          <div className="flex items-start gap-3">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-sm font-semibold text-primary ring-1 ring-primary/15 lg:hidden">
              {item.step}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Icon className="hidden h-4 w-4 text-primary lg:block" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
                  Step {item.step}
                </p>
              </div>
              <h3 className="mt-1.5 text-lg font-semibold leading-snug text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
            </div>
          </div>
        </div>

        <div className="relative flex-1 bg-gradient-to-b from-primary-soft/40 to-white px-4 py-4 sm:px-5 sm:py-5">
          <Mockup />
        </div>
      </article>
    </li>
  );
}

function UploadMockup() {
  const files = [
    { name: "FAQ.md", size: "12 KB", done: true },
    { name: "refund-policy.pdf", size: "84 KB", done: true },
    { name: "store-hours.txt", size: "2 KB", done: false },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Company memory
        </p>
        <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
          Knowledge base
        </span>
      </div>

      <div className="mx-3 mt-3 flex flex-col items-center rounded-xl border-2 border-dashed border-primary/20 bg-primary-soft/30 px-3 py-4">
        <Upload className="h-5 w-5 text-primary" />
        <p className="mt-2 text-xs font-medium text-slate-700">
          Drop FAQ, PDF, or .txt
        </p>
        <p className="text-[10px] text-slate-400">Notion export works too</p>
      </div>

      <ul className="mt-3 space-y-1.5 px-3 pb-3">
        {files.map((file) => (
          <li
            key={file.name}
            className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-2.5 py-2"
          >
            <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-800">
                {file.name}
              </p>
              <p className="text-[10px] text-slate-400">{file.size}</p>
            </div>
            {file.done ? (
              <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                Indexed
              </span>
            ) : (
              <span className="shrink-0 rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                Queued
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetMockup() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="ml-2 truncate text-[10px] text-slate-400">
          yourstore.com/help
        </span>
      </div>

      <div className="relative px-3 py-3">
        <div className="space-y-2 opacity-40">
          <div className="h-2 w-3/4 rounded bg-slate-200" />
          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="h-2 w-5/6 rounded bg-slate-100" />
        </div>

        <div className="mt-3 rounded-xl border border-primary/15 bg-white p-2.5 shadow-md shadow-slate-100/50">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/80">
            Website widget
          </p>

          <div className="mt-2 ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-primary px-2.5 py-1.5 text-[11px] leading-4 text-white">
            What&apos;s your return window?
          </div>

          <div className="mt-2 max-w-[95%] rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-2.5 py-2">
            <p className="text-[11px] leading-4 text-slate-700">
              30 days from delivery for unused items in original packaging.
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-primary">
              <FileText className="h-2.5 w-2.5" />
              Refund policy · §2
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-md bg-primary-soft/70 px-2 py-1.5">
            <span className="text-[10px] font-medium text-primary">
              Deflected · no ticket
            </span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
              Resolved
            </span>
          </div>
        </div>

        <div className="absolute bottom-2 right-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary shadow-lg shadow-slate-900/30">
          <MessageSquare className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
}

function TicketMockup() {
  const transcript = [
    { role: "customer", text: "Return window on online orders?" },
    { role: "bot", text: "30 days — see Refund policy §2." },
    { role: "customer", text: "Item arrived damaged, need exception." },
  ];

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

      <div className="max-h-[7.5rem] space-y-1.5 overflow-hidden px-3 py-2.5">
        {transcript.map((line, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg px-2 py-1 text-[10px] leading-4",
              line.role === "customer"
                ? "ml-4 bg-primary-soft text-primary"
                : "mr-4 bg-slate-50 text-slate-700",
            )}
          >
            <span className="font-semibold capitalize">{line.role}: </span>
            {line.text}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/80 px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Execution log
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {["Escalated", "847ms", "Policy §2 cited"].map((tag) => (
            <span
              key={tag}
              className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-primary/15 bg-primary-soft/50 px-3 py-2">
        <p className="text-[10px] font-medium text-primary">
          Review log → fix FAQ gap
        </p>
        <span className="rounded-lg bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
          One click
        </span>
      </div>
    </div>
  );
}
