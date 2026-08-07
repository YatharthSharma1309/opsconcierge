import { getChatModel, isAiConfigured } from "@/lib/ai";
import { createChatCompletion } from "@/lib/recruitment/openrouter";
import { db } from "@/lib/db";

export type DraftFaqResult = {
  title: string;
  content: string;
  modelId: string | null;
  contextTickets: number;
};

function parseDraftJson(raw: string): { title: string; content: string } {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as { title?: unknown; content?: unknown };
    const title = typeof parsed.title === "string" ? parsed.title.trim() : "";
    const content = typeof parsed.content === "string" ? parsed.content.trim() : "";
    if (title && content) {
      return { title: title.slice(0, 120), content };
    }
  } catch {
    // fall through to plain-text fallback
  }

  const firstLine = cleaned.split("\n").find((line) => line.trim()) ?? "FAQ draft";
  return {
    title: firstLine.replace(/^#+\s*/, "").slice(0, 120),
    content: cleaned,
  };
}

export async function draftFaqFromGap(
  organizationId: string,
  topic: string,
): Promise<DraftFaqResult> {
  const trimmedTopic = topic.trim().slice(0, 200);
  if (trimmedTopic.length < 3) {
    throw new Error("Topic is required to draft an FAQ.");
  }

  const relatedTickets = await db.ticket.findMany({
    where: {
      organizationId,
      title: { startsWith: "Escalation:" },
      OR: [
        { title: { contains: trimmedTopic.slice(0, 40), mode: "insensitive" } },
        { description: { contains: trimmedTopic.slice(0, 40), mode: "insensitive" } },
      ],
    },
    select: { title: true, description: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const contextBlock =
    relatedTickets.length > 0
      ? relatedTickets
          .map(
            (ticket, index) =>
              `Ticket ${index + 1}: ${ticket.title}\n${ticket.description.slice(0, 1200)}`,
          )
          .join("\n\n---\n\n")
      : "No ticket transcripts available. Draft a practical FAQ from the topic alone.";

  if (!isAiConfigured()) {
    const title = `FAQ: ${trimmedTopic.slice(0, 80)}`;
    const content = [
      `# ${title}`,
      "",
      "## Question",
      trimmedTopic,
      "",
      "## Answer",
      "Add the official policy answer here. Include eligibility, steps the customer should take, and when to contact support.",
      "",
      "## When to escalate",
      "Escalate if the customer needs an exception, billing adjustment, or account-specific investigation.",
    ].join("\n");

    return {
      title,
      content,
      modelId: null,
      contextTickets: relatedTickets.length,
    };
  }

  const raw = await createChatCompletion({
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `You draft short FAQ articles for a small-business knowledge base.
Return ONLY valid JSON with keys "title" and "content".
content must be Markdown with: a clear answer, bullet steps if useful, and a short "When to escalate" section.
Do not invent company-specific numbers, SLAs, or legal claims. Use placeholders like [policy window] when unknown.
Keep content under 450 words.`,
      },
      {
        role: "user",
        content: `Knowledge gap topic (from escalated support chats):
${trimmedTopic}

Related escalation context:
${contextBlock}`,
      },
    ],
  });

  const draft = parseDraftJson(raw);
  return {
    title: draft.title || `FAQ: ${trimmedTopic.slice(0, 80)}`,
    content: draft.content,
    modelId: getChatModel(),
    contextTickets: relatedTickets.length,
  };
}
