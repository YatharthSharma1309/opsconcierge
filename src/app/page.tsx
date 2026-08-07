import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DemoShortcuts } from "@/components/marketing/demo-shortcuts";
import { FounderPainsSection } from "@/components/marketing/founder-pains-section";
import { HeroOpsPreview } from "@/components/marketing/hero-ops-preview";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { OpsLanesSection } from "@/components/marketing/ops-lanes";
import { ProductDemoWalkthrough } from "@/components/marketing/product-demo-walkthrough";
import { buttonClassName } from "@/components/ui/button";
import { isMarketingDemoMode } from "@/lib/env/marketing-demo";

const personas = [
  {
    name: "D2C / Shopify brands",
    use: "Returns, shipping, and “where is my order?” policy answers on the store site.",
  },
  {
    name: "Early SaaS teams",
    use: "Password, billing, and how-to deflection — escalate SSO bugs with context.",
  },
  {
    name: "Clinics & local services",
    use: "Hours, insurance basics, membership FAQs while booking stays in your system.",
  },
  {
    name: "Tutoring & agencies",
    use: "Parent FAQ plus a hiring inbox when you screen tutors or support hires.",
  },
];

const includes = [
  "Multi-tenant workspace with shared knowledge",
  "Support chat + tickets + analytics",
  "Hiring pipeline with AI match assist",
  "Embeddable widget preview",
  "Auditable execution runs for owners and judges",
];

const notIncludes = [
  "Replacing your phone line or WhatsApp Business day one",
  "Live order tracking or refunds without your shop APIs",
  "Auto-rejecting candidates or “AI decides who to hire”",
  "Enterprise ATS / 50-agent call-center software",
];

export default function LandingPage() {
  const demoMode = isMarketingDemoMode();
  const primaryHref = demoMode ? "/dashboard" : "/sign-up";
  const secondaryHref = demoMode ? "/widget" : "/help";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />

      <main id="main-content" className="flex-1">
        {/* Hero — brand + one headline + support + CTAs + product preview */}
        <section className="hero-gradient border-b border-slate-200/80">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-18 sm:pt-14 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-14">
            <div>
              <h1 className="max-w-xl text-5xl font-bold tracking-[-0.03em] text-slate-900 md:text-6xl md:leading-[1.05]">
                OpsConcierge
              </h1>
              <p className="mt-4 max-w-xl text-xl font-medium leading-8 tracking-tight text-slate-800 md:text-2xl md:leading-9">
                The ops desk for small businesses that still live in email and
                DMs
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                Deflect FAQs on your site, escalate messy cases with the full
                chat, and shortlist hires from resumes — with a log of every AI
                decision.
              </p>
              {demoMode ? (
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                  Built for Build with Gemini XPRIZE · Small Business Services
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={primaryHref}
                  className={buttonClassName({ size: "lg" })}
                >
                  {demoMode ? "Open live demo" : "Get started free"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={demoMode ? "/#try-demo" : secondaryHref}
                  className={buttonClassName({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  {demoMode ? "How to use it" : "Help center"}
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="hero-preview-float w-full max-w-md lg:max-w-none">
                <HeroOpsPreview />
              </div>
            </div>
          </div>
        </section>

        {demoMode ? (
          <section className="border-b border-slate-200/80 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
              <DemoShortcuts tone="light" />
            </div>
          </section>
        ) : null}

        <FounderPainsSection />

        <HowItWorksSection
          demoMode={demoMode}
          primaryHref={primaryHref}
          secondaryHref={secondaryHref}
        />

        <ProductDemoWalkthrough demoMode={demoMode} />

        <section
          id="features"
          className="scroll-mt-20 border-b border-slate-200/80 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Two lanes. One ops desk.
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Support and hiring share the same company memory — because in a
              small business, it is usually the same person doing both.
            </p>

            <OpsLanesSection
              showDemoCta={demoMode}
              className="mt-12"
            />
          </div>
        </section>

        <section
          id="who"
          className="scroll-mt-20 border-b border-slate-200/80 bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Built for real small businesses
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              If you are under ~50 people and still own the inbox, you are the
              buyer — not enterprise IT.
            </p>
            <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
              {personas.map((persona) => (
                <li
                  key={persona.name}
                  className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
                >
                  <p className="font-semibold text-slate-900">{persona.name}</p>
                  <p className="text-sm leading-6 text-slate-600">
                    {persona.use}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="scope"
          className="scroll-mt-20 border-b border-slate-200/80 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              What you get — and what we do not claim
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Honest scope beats “90% autonomous support” marketing that SMBs
              abandon in 30 days.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Included
                </h3>
                <ul className="mt-4 space-y-3">
                  {includes.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-sm leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Not in v1
                </h3>
                <ul className="mt-4 space-y-3">
                  {notIncludes.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-0.5 inline-block h-4 w-4 shrink-0 text-center text-slate-400">
                        –
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-6 text-slate-500">
              Realistic first-90-day target on a clean FAQ: about 40–60%
              deflection of routine questions, with humans handling the rest —
              and a weekly log review so the knowledge base improves.
            </p>
          </div>
        </section>

        <section
          id="pricing"
          className="scroll-mt-20 border-b border-slate-200/80 bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Simple pricing for small businesses
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Start free while you prove deflection on your FAQ. Upgrade when
              tickets and hiring shortlists are part of the weekly ops rhythm.
              No per-resolution surprise fees.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Free",
                  price: "$0",
                  detail:
                    "1 workspace · widget · knowledge upload · watermarked logs",
                  cta: demoMode ? "Open live demo" : "Get started free",
                  href: primaryHref,
                },
                {
                  name: "Pro",
                  price: "$29–$49/mo",
                  detail:
                    "Higher volume · analytics · hiring lane · execution exports — planned",
                  cta: demoMode ? "Open live demo" : "Start free — Pro later",
                  href: primaryHref,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  detail: "SSO · private deploy · API · audit exports — later",
                  cta: demoMode ? "Open live demo" : "Contact us",
                  href: demoMode ? "/dashboard" : "mailto:hello@opsconcierge.app",
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col border-t-2 border-primary pt-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {plan.name}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {plan.price}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {plan.detail}
                  </p>
                  {plan.href.startsWith("mailto:") ? (
                    <a
                      href={plan.href}
                      className={buttonClassName({
                        variant: "secondary",
                        size: "sm",
                        className: "mt-6 w-full",
                      })}
                    >
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={plan.href}
                      className={buttonClassName({
                        variant:
                          plan.name === "Enterprise" ? "secondary" : "primary",
                        size: "sm",
                        className: "mt-6 w-full",
                      })}
                    >
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              {demoMode
                ? "Walk the full path in the live demo"
                : "Put your FAQ to work this week"}
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              {demoMode
                ? "Command center → widget chat → escalate → execution log → optional hiring shortlist. No sign-in required in demo mode."
                : "Upload one policy doc, embed the widget, and measure how many repeats never become tickets."}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={primaryHref} className={buttonClassName({ size: "lg" })}>
                {demoMode ? "Open live demo" : "Get started free"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={demoMode ? "/recruitment" : "/help"}
                className={buttonClassName({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                {demoMode ? "Hiring lane" : "Help center"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
