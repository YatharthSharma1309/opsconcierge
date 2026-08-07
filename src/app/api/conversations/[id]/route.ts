import { NextResponse } from "next/server";
import { withOrgMembership } from "@/lib/auth/api";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  return withOrgMembership(async ({ organization }) => {
    const { id } = await context.params;

    const conversation = await db.conversation.findFirst({
      where: { id, organizationId: organization.id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
        tickets: {
          where: {
            status: { in: ["OPEN", "IN_PROGRESS"] },
            title: { startsWith: "Escalation:" },
          },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { id: true },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    const openTicketId = conversation.tickets[0]?.id ?? null;

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        title: conversation.title,
        channel: conversation.channel,
        updatedAt: conversation.updatedAt,
        messages: conversation.messages,
      },
      openTicketId,
    });
  });
}
