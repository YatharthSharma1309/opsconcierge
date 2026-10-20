import { redirect } from "next/navigation";
import { isPublicDemoMode } from "@/lib/env/public-demo";
import { DEMO_HIRING_PATH } from "@/lib/recruitment/demo-sample";

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  if (isPublicDemoMode()) {
    redirect(DEMO_HIRING_PATH);
  }

  return children;
}
