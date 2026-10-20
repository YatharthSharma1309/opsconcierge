import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedShortlistView } from "@/components/recruitment/shared-shortlist";
import { getSharedShortlist } from "@/lib/recruitment/services/shortlist";

type SharePageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "Shortlist",
  robots: { index: false, follow: false },
};

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  const shortlist = await getSharedShortlist(token);
  if (!shortlist) notFound();
  return <SharedShortlistView shortlist={shortlist} />;
}
