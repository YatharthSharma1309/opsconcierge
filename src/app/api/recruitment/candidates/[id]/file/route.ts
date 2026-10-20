import { NextResponse } from "next/server";
import { withRecruitmentOrg } from "@/lib/recruitment/api-handler";
import { getCandidateFile } from "@/lib/recruitment/services/candidates";

type RouteContext = { params: Promise<{ id: string }> };

function attachmentName(fileName: string) {
  const safe = fileName.replace(/[\r\n"]/g, "") || "resume";
  return `attachment; filename="${safe}"; filename*=UTF-8''${encodeURIComponent(safe)}`;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return withRecruitmentOrg(async ({ organization }) => {
    const file = await getCandidateFile(organization.id, id);
    if (!file) {
      return NextResponse.json(
        { error: "The original file was not kept for this resume." },
        { status: 404 },
      );
    }

    const bytes =
      file.bytes instanceof Uint8Array ? file.bytes : new Uint8Array(file.bytes);

    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": attachmentName(file.fileName),
      },
    });
  });
}
