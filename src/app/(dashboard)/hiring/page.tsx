import { redirect } from "next/navigation";
import DemoHiringPage from "@/app/demo/hiring/page";
import { isPublicDemoMode } from "@/lib/env/public-demo";

export default function HiringPage() {
  if (!isPublicDemoMode()) redirect("/recruitment");
  return <DemoHiringPage />;
}
