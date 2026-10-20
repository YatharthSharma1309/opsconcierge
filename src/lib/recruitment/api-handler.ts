import { NextResponse } from "next/server";
import { withOrgMembership, type OrgMembershipContext } from "@/lib/auth";
import { isPublicDemoMode } from "@/lib/env/public-demo";
import { RecruitmentError } from "@/lib/recruitment/errors";

export function recruitmentErrorResponse(error: unknown) {
  if (error instanceof RecruitmentError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }
  return null;
}

export async function withRecruitmentOrg<T>(
  handler: (context: OrgMembershipContext) => Promise<T>,
) {
  if (isPublicDemoMode()) {
    return NextResponse.json(
      {
        error:
          "The public demo uses fictional sample candidates only. Resume uploads and candidate changes are turned off.",
        code: "DEMO_READ_ONLY",
      },
      { status: 403 },
    );
  }

  return withOrgMembership(async (context) => {
    try {
      return await handler(context);
    } catch (error) {
      const mapped = recruitmentErrorResponse(error);
      if (mapped) return mapped;
      throw error;
    }
  });
}
