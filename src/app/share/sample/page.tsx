import type { Metadata } from "next";
import { SharedShortlistView } from "@/components/recruitment/shared-shortlist";
import { demoSharedShortlist } from "@/lib/recruitment/demo-sample";

export const metadata: Metadata = {
  title: "Sample shortlist",
  robots: { index: false, follow: false },
};

export default function SampleSharePage() {
  return <SharedShortlistView shortlist={demoSharedShortlist()} />;
}
