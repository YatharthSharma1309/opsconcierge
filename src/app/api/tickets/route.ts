import { NextResponse } from "next/server";
import { withOrgMembership } from "@/lib/auth/api";
import { parseJsonBody } from "@/lib/api/json";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { isTicketPriority, type TicketPriority } from "@/lib/tickets/constants";
import {
  attachTicketTriage,
  createSupportTicket,
} from "@/lib/tickets/create-ticket";
import {
  heuristicEscalationTriage,
  triageEscalation,
} from "@/lib/tickets/escalation-triage";

export const maxDuration = 60;

async function triageWithTimeout(title: string, description: string) {
  try {
    const result = await Promise.race([
      triageEscalation(title, description),
      new Promise<"timeout">((resolve) => {
        setTimeout(() => resolve("timeout"), 8_000);
      }),
    ]);
    return result === "timeout" ? null : result;
  } catch (error) {
    console.error("Escalation triage error:", error);
    return null;
  }
}

export async function GET() {
  return withOrgMembership(async ({ organization }) => {
    const tickets = await db.ticket.findMany({
      where: { organizationId: organization.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ tickets });
  });
}

export async function POST(request: Request) {
  return withOrgMembership(async ({ organization }) => {
    if (await checkRateLimit(`admin-tickets:${organization.id}`, 30, 60 * 60 * 1000)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const parsed = await parseJsonBody<Record<string, unknown>>(request);
    if ("error" in parsed) return parsed.error;
    const body = parsed.data;
    const title = String(body.title ?? "").trim();
    let description = String(body.description ?? "").trim();
    const priorityInput = String(body.priority ?? "MEDIUM");
    const conversationId = body.conversationId
      ? String(body.conversationId)
      : null;
    const requesterEmail = body.requesterEmail
      ? String(body.requesterEmail).trim()
      : null;
    const requesterName = body.requesterName
      ? String(body.requesterName).trim()
      : null;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!description) {
      description = title.startsWith("Escalation:")
        ? title
        : `Escalation request: ${title}`;
    }

    if (!isTicketPriority(priorityInput)) {
      return NextResponse.json(
        { error: "Invalid ticket priority" },
        { status: 400 },
      );
    }

    let priority: TicketPriority = priorityInput;
    const isEscalation = title.startsWith("Escalation:");

    if (conversationId) {
      const conversation = await db.conversation.findFirst({
        where: { id: conversationId, organizationId: organization.id },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Linked conversation not found" },
          { status: 400 },
        );
      }

      if (isEscalation) {
        const existingEscalation = await db.ticket.findFirst({
          where: {
            organizationId: organization.id,
            conversationId,
            title: { startsWith: "Escalation:" },
            status: { in: ["OPEN", "IN_PROGRESS"] },
          },
        });

        if (existingEscalation) {
          return NextResponse.json({
            ticket: existingEscalation,
            duplicate: true,
          });
        }
      }
    }

    if (isEscalation) {
      priority = heuristicEscalationTriage(title, description).priority;
    }

    const ticket = await createSupportTicket({
      organizationId: organization.id,
      title,
      description,
      priority,
      conversationId,
      requesterEmail,
      requesterName,
    });

    if (!isEscalation) {
      return NextResponse.json({ ticket });
    }

    const triage =
      (await triageWithTimeout(title, description)) ??
      heuristicEscalationTriage(title, description);

    const updated = await attachTicketTriage(ticket.id, triage);
    return NextResponse.json({ ticket: updated ?? ticket });
  });
}
