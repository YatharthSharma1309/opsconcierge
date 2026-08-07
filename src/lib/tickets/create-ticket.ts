import { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import type { TicketPriority } from "@/lib/tickets/constants";
import type { EscalationTriage } from "@/lib/tickets/escalation-triage";

type CreateTicketInput = {
  organizationId: string;
  title: string;
  description: string;
  priority: TicketPriority;
  conversationId: string | null;
  requesterEmail: string | null;
  requesterName: string | null;
};

/** Create ticket without triage — escalate must not depend on AI/schema extras. */
export async function createSupportTicket(input: CreateTicketInput) {
  return db.ticket.create({
    data: {
      organizationId: input.organizationId,
      title: input.title,
      description: input.description,
      priority: input.priority,
      conversationId: input.conversationId,
      requesterEmail: input.requesterEmail,
      requesterName: input.requesterName,
    },
  });
}

/** Best-effort triage attach; never throws. */
export async function attachTicketTriage(
  ticketId: string,
  triage: EscalationTriage,
) {
  try {
    return await db.ticket.update({
      where: { id: ticketId },
      data: {
        priority: triage.priority,
        triage: triage as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("Ticket triage attach failed (non-fatal):", message);
    return null;
  }
}
