import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Headphones,
  Zap,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { buttonClassName } from "@/components/ui/button";
import {
  demoModuleLinks,
  isMarketingDemoMode,
} from "@/lib/env/marketing-demo";

const features = [
  {
    icon: BookOpen,
    title: "Shared company memory",
    description:
      "Upload SOPs, FAQs, pricing, and policies. Every agent lane answers from the same business knowledge.",
  },
  {
    icon: Bot,
    title: "Gemini-powered concierge",
    description:
      "Inbound widget requests are answered by Gemini in production — not a generic chatbot toy.",
  },
  {
    icon: Headphones,
    title: "Tickets + execution logs",
    description:
      "Every run leaves an audit trail: lane routing → Gemini call → ticket update for judges and owners.",
  },
  {
    icon: BarChart3,
    title: "Ops analytics",
    description:
      "Track deflection, ticket trends, and where the AI handed off to humans.",
  },
  {
    icon: Briefcase,
    title: "Hiring agent lane",
    description:
      "Screen resumes, score candidates, draft interview questions, and keep hiring in the same workspace.",
  },
];

export default function LandingPage() {
  const demoMode = isMarketingDemoMode();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />

      <main id="main-content" className="flex-1">
        <section className="hero-gradient mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <Zap className="h-3.5 w-3.5" />
              {demoMode
                ? "OpsConcierge · AI-operated business"
                : "Gemini-powered · Support + Hiring concierge"}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl md:leading-tight">
              The AI concierge that{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                runs your business operations
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Capture inbound requests, route them to the right AI agent lane,
              answer from company memory, update tickets, and leave an
              auditable execution log — not just another chatbot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={demoMode ? "/dashboard" : "/sign-up"}
                className={buttonClassName({ size: "lg" })}
              >
                {demoMode ? "Open live demo" : "Get started free"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={demoMode ? "/recruitment" : "/help"}
                className={buttonClassName({ variant: "secondary", size: "lg" })}
              >
                {demoMode ? "View recruitment" : "Browse help center"}
              </Link>
            </div>
            {demoMode ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {demoModuleLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              { label: "Ops workflow", value: "Widget → Agent → Ticket" },
              { label: "AI engine", value: "Gemini in production" },
              { label: "Evidence", value: "Auditable execution logs" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/80 bg-white/70 p-5 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
        >
          <h2 className="text-2xl font-semibold text-slate-900">
            What OpsConcierge runs for you
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            One AI concierge for support and hiring — shared memory, production
            Gemini calls, and auditable execution logs.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="pricing"
          className="border-t border-slate-200 bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Simple pricing for small businesses
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Start free. Upgrade when OpsConcierge is answering customers and
              updating tickets for you.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Free",
                  price: "$0",
                  detail: "1 workspace · 1 AI agent · watermarked logs",
                },
                {
                  name: "Pro",
                  price: "$29–$49/mo",
                  detail: "Multiple agents · analytics · custom workflows",
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  detail: "Private deploy · SSO · audit logs · API",
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                    {plan.name}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {plan.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              {demoMode ? "Explore the full platform" : "Ready to transform your support?"}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              {demoMode
                ? "Walk through support AI, ticket workflows, recruitment scoring, and analytics — no sign-in required."
                : "Launch a cited AI helpdesk, embed it on your site, and measure deflection in minutes."}
            </p>
            <Link
              href={demoMode ? "/dashboard" : "/sign-up"}
              className={buttonClassName({ size: "lg", className: "mt-8" })}
            >
              {demoMode ? "Open live demo" : "Start your workspace"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
