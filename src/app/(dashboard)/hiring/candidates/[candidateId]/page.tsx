import { redirect } from "next/navigation";
import DemoCandidatePage from "@/app/demo/hiring/candidates/[candidateId]/page";
import { isPublicDemoMode } from "@/lib/env/public-demo";

type HiringCandidatePageProps = {
  params: Promise<{ candidateId: string }>;
};

export default function HiringCandidatePage({ params }: HiringCandidatePageProps) {
  if (!isPublicDemoMode()) redirect("/recruitment");
  return <DemoCandidatePage params={params} />;
}
