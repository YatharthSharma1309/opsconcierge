import Link from "next/link";
import { ArrowLeft, Columns2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { DemoCompareView } from "@/components/recruitment/demo-compare-view";
import { buttonClassName } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { DEMO_HIRING_PATH, demoHiringJob, getDemoCandidatesByIds } from "@/lib/recruitment/demo-sample";

type DemoComparePageProps = {
  searchParams: Promise<{ ids?: string }>;
};

function parseCompareIds(raw: string | undefined) {
  if (!raw?.trim()) return [];
  return [
    ...new Set(
      raw
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ].slice(0, 3);
}

export default async function DemoComparePage({ searchParams }: DemoComparePageProps) {
  const { ids: idsParam } = await searchParams;
  const candidates = getDemoCandidatesByIds(parseCompareIds(idsParam));

  return (
    <>
      <Header
        title="Compare sample candidates"
        description={`Same criteria for ${demoHiringJob.title}. Choose two or three people.`}
        action={
          <Link
            href={DEMO_HIRING_PATH}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sample job
          </Link>
        }
      />
      <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        {candidates.length < 2 ? (
          <EmptyState
            icon={Columns2}
            title="Select two or three candidates"
            description="Go back to the sample job and choose who to compare."
            action={
              <Link href={DEMO_HIRING_PATH} className={buttonClassName()}>
                Back to sample job
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <DemoCompareView
              requiredSkills={[...demoHiringJob.requiredSkills]}
              candidates={candidates}
            />
          </div>
        )}
      </main>
    </>
  );
}
