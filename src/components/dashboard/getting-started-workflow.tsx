"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  MessageSquare,
  Ticket,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Add knowledge",
    description: "Upload FAQs or load sample data so answers cite real policies.",
    href: "/knowledge",
    icon: BookOpen,
    color: "text-primary bg-primary-soft",
  },
  {
    step: "02",
    title: "Try the widget",
    description: "Ask a refund or password question and check the grounded sources.",
    href: "/widget",
    icon: MessageSquare,
    color: "text-primary bg-primary-soft",
  },
  {
    step: "03",
    title: "Escalate a case",
    description: "Create a ticket with the full transcript, then review the execution log.",
    href: "/widget/intake",
    icon: Ticket,
    color: "text-slate-700 bg-slate-100",
  },
  {
    step: "04",
    title: "Screen a hire",
    description: "Open Hiring lane, review scored candidates, and decide shortlist or reject.",
    href: "/recruitment",
    icon: Briefcase,
    color: "text-accent bg-accent-soft",
  },
];

export function GettingStartedWorkflow() {
  return (
    <Card>
      <CardTitle>How to make it work</CardTitle>
      <CardDescription>
        Walk the live path: knowledge → widget → escalate → hiring shortlist.
      </CardDescription>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.step}
              href={item.href}
              className="group rounded-xl border border-slate-100 p-4 transition-all hover:border-teal-200 hover:bg-accent-soft/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Step {item.step}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className={`mt-3 inline-flex rounded-xl p-2.5 ${item.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-3 font-medium text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
