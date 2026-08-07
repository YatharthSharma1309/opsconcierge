"use client";

import { useState, type ReactNode } from "react";
import {
  ClipboardList,
  FileText,
  Ticket,
  UserRoundSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Lane = "support" | "hiring";

const SUPPORT = {
  question: "What's your return window on online orders?",
  source: "Refund policy · §2",
  answer:
    "You have 30 days from delivery for unused items in original packaging. Start a return from Orders → Request return.",
  action: "Escalate to human",
  actionHint: "Creates a ticket with this transcript",
};

const HIRING = {
  question: "Screen this resume for Support Associate",
  candidate: "Priya M. · 3 yrs retail + Zendesk",
  why: [
    "Matches must-have: customer-facing experience",
    "Tooling overlap: Zendesk mentioned",
  ],
  whyNot: ["No bilingual requirement evidence"],
  score: 78,
  action: "Shortlist & prep questions",
  actionHint: "You still decide hire / reject",
};

/**
 * Static product preview — user switches Support / Hiring tabs.
 * No autoplay (avoids flicker and accidental lane flipping).
 */
export function HeroOpsPreview() {
  const [lane, setLane] = useState<Lane>("support");
  const isSupport = lane === "support";

  return (
    <div className="relative w-full max-w-md animate-fade-up lg:max-w-none">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)]">
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent",
            isSupport ? "from-primary-soft/80" : "from-teal-50/80",
          )}
          aria-hidden
        />

        <div className="relative border-b border-slate-100 px-3 py-3 sm:px-4">
          <div
            className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100/90 p-1"
            role="tablist"
            aria-label="Ops lane preview"
          >
            <LaneChip
              active={isSupport}
              onClick={() => setLane("support")}
              icon={<ClipboardList className="h-3.5 w-3.5" />}
              label="Support"
              tone="navy"
            />
            <LaneChip
              active={!isSupport}
              onClick={() => setLane("hiring")}
              icon={<UserRoundSearch className="h-3.5 w-3.5" />}
              label="Hiring"
              tone="teal"
            />
          </div>
          <p className="mt-2.5 text-center text-[11px] font-medium text-slate-400">
            {isSupport ? "Widget → ticket" : "Resume → shortlist"}
            <span className="mx-1.5 text-slate-300" aria-hidden>
              ·
            </span>
            Click a tab to switch
          </p>
        </div>

        <div
          className="relative px-4 py-4 sm:px-5 sm:py-5"
          role="tabpanel"
          aria-label={isSupport ? "Support lane preview" : "Hiring lane preview"}
        >
          {isSupport ? <SupportPanel /> : <HiringPanel />}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-4 py-2.5 text-[11px] text-slate-500">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full",
                isSupport ? "bg-[var(--primary-hover)]" : "bg-teal-500",
              )}
            />
            <span className="truncate">Grounded in company memory</span>
          </span>
          <span
            className={cn(
              "shrink-0 font-semibold",
              isSupport ? "text-primary" : "text-teal-700",
            )}
          >
            {isSupport ? "Support" : "Hiring"}
          </span>
        </div>
      </div>
    </div>
  );
}

function LaneChip({
  active,
  onClick,
  icon,
  label,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  tone: "navy" | "teal";
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors",
        active
          ? tone === "navy"
            ? "bg-white text-primary shadow-sm ring-1 ring-primary/15"
            : "bg-white text-teal-800 shadow-sm ring-1 ring-teal-100"
          : "text-slate-500 hover:bg-white/70 hover:text-slate-700",
      )}
    >
      <span
        className={cn(
          active
            ? tone === "navy"
              ? "text-primary"
              : "text-teal-700"
            : "text-slate-400",
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

function SupportPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/80">
          Website widget
        </p>
        <span className="rounded-md bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
          Customer ask
        </span>
      </div>

      <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-5 text-white">
        {SUPPORT.question}
      </div>

      <div className="max-w-[95%] space-y-2 rounded-2xl rounded-bl-md border border-slate-100 bg-slate-50 px-3.5 py-3">
        <p className="text-sm leading-6 text-slate-700">{SUPPORT.answer}</p>
        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">
          <FileText className="h-3 w-3" />
          {SUPPORT.source}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/15 bg-primary-soft/70 px-3 py-2.5">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
            <Ticket className="h-3.5 w-3.5 shrink-0" />
            {SUPPORT.action}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-primary/80">
            {SUPPORT.actionHint}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-semibold text-white">
          One click
        </span>
      </div>
    </div>
  );
}

function HiringPanel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700/80">
          Hiring inbox
        </p>
        <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
          Resume screen
        </span>
      </div>

      <div className="rounded-xl border border-teal-100 bg-teal-50/40 px-3.5 py-3">
        <p className="text-sm font-medium text-slate-900">{HIRING.question}</p>
        <p className="mt-1 text-xs text-slate-500">{HIRING.candidate}</p>
      </div>

      <div className="space-y-2.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900">Match score</p>
          <span className="rounded-lg bg-teal-100 px-2 py-0.5 text-xs font-semibold tabular-nums text-teal-800">
            {HIRING.score}
          </span>
        </div>
        <ul className="space-y-1.5">
          {HIRING.why.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-xs leading-5 text-emerald-700"
            >
              <span className="font-semibold" aria-hidden>
                +
              </span>
              <span>{line}</span>
            </li>
          ))}
          {HIRING.whyNot.map((line) => (
            <li
              key={line}
              className="flex gap-2 text-xs leading-5 text-slate-500"
            >
              <span className="font-semibold" aria-hidden>
                –
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-teal-100 bg-teal-50/70 px-3 py-2.5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-teal-950">{HIRING.action}</p>
          <p className="mt-0.5 truncate text-[11px] text-teal-800/80">
            {HIRING.actionHint}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-teal-700 px-2.5 py-1 text-[11px] font-semibold text-white">
          You decide
        </span>
      </div>
    </div>
  );
}
