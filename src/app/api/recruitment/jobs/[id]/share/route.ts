import { NextResponse } from "next/server";
import { withRecruitmentOrg } from "@/lib/recruitment/api-handler";
import { recordRecruitmentAuditEvent } from "@/lib/recruitment/services/audit";
import { ensureShareToken } from "@/lib/recruitment/services/shortlist";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;

  return withRecruitmentOrg(async ({ organization, user }) => {
    const share = await ensureShareToken(organization.id, id);
    if (!share) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    if (share.created) {
      await recordRecruitmentAuditEvent({
        organizationId: organization.id,
        action: "job.share",
        entityType: "job",
        entityId: id,
        actorId: user.id,
      });
    }

    const url = new URL(`/share/${share.token}`, request.url).toString();
    return NextResponse.json({ url });
  });
}
