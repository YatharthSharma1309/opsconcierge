import { redirect } from "next/navigation";
import DemoComparePage from "@/app/demo/hiring/compare/page";
import { isPublicDemoMode } from "@/lib/env/public-demo";

type HiringComparePageProps = {
  searchParams: Promise<{ ids?: string }>;
};

export default function HiringComparePage({ searchParams }: HiringComparePageProps) {
  if (!isPublicDemoMode()) redirect("/recruitment");
  return <DemoComparePage searchParams={searchParams} />;
}
