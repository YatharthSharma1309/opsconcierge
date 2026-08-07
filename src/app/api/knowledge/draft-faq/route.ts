import { NextResponse } from "next/server";
import { withOrgMembership } from "@/lib/auth/api";
import { draftFaqFromGap } from "@/lib/knowledge/draft-faq";
import { RecruitmentError } from "@/lib/recruitment/errors";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  return withOrgMembership(async ({ organization }) => {
    if (
      await checkRateLimit(`draft-faq:${organization.id}`, 20, 60 * 60 * 1000)
    ) {
      return NextResponse.json(
        { error: "Draft rate limit exceeded. Try again later." },
        { status: 429 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as { topic?: unknown };
    const topic = typeof body.topic === "string" ? body.topic.trim() : "";

    if (topic.length < 3) {
      return NextResponse.json(
        { error: "Provide a knowledge-gap topic to draft." },
        { status: 400 },
      );
    }

    try {
      const draft = await draftFaqFromGap(organization.id, topic);
      return NextResponse.json({ draft });
    } catch (error) {
      if (error instanceof RecruitmentError) {
        const status =
          error.code === "MISSING_API_KEY"
            ? 503
            : error.code === "EMPTY_MODEL"
              ? 502
              : 500;
        return NextResponse.json(
          { error: error.message, code: error.code },
          { status },
        );
      }

      const message =
        error instanceof Error ? error.message : "Failed to draft FAQ";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  });
}
