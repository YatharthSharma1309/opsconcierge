import {
  getAiClient,
  getChatModel,
  isAiConfigured,
  shouldAttemptGemini,
} from "@/lib/ai";
import { geminiChatCompletion } from "@/lib/gemini";
import {
  isTicketPriority,
  type TicketPriority,
} from "@/lib/tickets/constants";

export const ESCALATION_CATEGORIES = [
  "safety",
  "access",
  "billing",
  "product",
  "shipping",
  "scheduling",
  "other",
] as const;

export type EscalationCategory = (typeof ESCALATION_CATEGORIES)[number];

export type EscalationTriage = {
  priority: TicketPriority;
  category: EscalationCategory;
  reasonCode: string;
  brief: string[];
  model: string | null;
  source: "ai" | "heuristic";
};

const CATEGORY_LABELS: Record<EscalationCategory, string> = {
  safety: "Safety / urgent risk",
  access: "Account access",
  billing: "Billing",
  product: "Product / how-to",
  shipping: "Shipping / delivery",
  scheduling: "Scheduling",
  other: "Other",
};

export function escalationCategoryLabel(category: string) {
  if ((ESCALATION_CATEGORIES as readonly string[]).includes(category)) {
    return CATEGORY_LABELS[category as EscalationCategory];
  }
  return category;
}

function isEscalationCategory(value: string): value is EscalationCategory {
  return (ESCALATION_CATEGORIES as readonly string[]).includes(value);
}

function normalizeBrief(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function parseEscalationTriage(value: unknown): EscalationTriage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  const priority =
    typeof record.priority === "string" && isTicketPriority(record.priority)
      ? record.priority
      : null;
  const categoryRaw =
    typeof record.category === "string" ? record.category.trim().toLowerCase() : "";
  const category = isEscalationCategory(categoryRaw) ? categoryRaw : null;
  const reasonCode =
    typeof record.reasonCode === "string"
      ? record.reasonCode.trim().slice(0, 64)
      : "";
  const brief = normalizeBrief(record.brief);
  const source = record.source === "ai" || record.source === "heuristic"
    ? record.source
    : null;

  if (!priority || !category || !reasonCode || brief.length === 0 || !source) {
    return null;
  }

  return {
    priority,
    category,
    reasonCode,
    brief,
    model: typeof record.model === "string" ? record.model : null,
    source,
  };
}

function parseAiTriageJson(raw: string): Omit<EscalationTriage, "model" | "source"> | null {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    const priorityRaw =
      typeof parsed.priority === "string"
        ? parsed.priority.trim().toUpperCase()
        : "";
    const categoryRaw =
      typeof parsed.category === "string"
        ? parsed.category.trim().toLowerCase()
        : "";
    const reasonCode =
      typeof parsed.reasonCode === "string"
        ? parsed.reasonCode
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9_]+/g, "_")
            .slice(0, 64)
        : "";
    const brief = normalizeBrief(parsed.brief);

    if (
      !isTicketPriority(priorityRaw) ||
      !isEscalationCategory(categoryRaw) ||
      !reasonCode ||
      brief.length < 2
    ) {
      return null;
    }

    return {
      priority: priorityRaw,
      category: categoryRaw,
      reasonCode,
      brief: brief.slice(0, 3),
    };
  } catch {
    return null;
  }
}

/** Keyword fallback when AI is off or fails — never blocks escalate. */
export function heuristicEscalationTriage(
  title: string,
  description: string,
): EscalationTriage {
  const text = `${title}\n${description}`.toLowerCase();

  const safetyHit =
    /\b(gas\s*smell|smell\s*of\s*gas|fire|smoke|carbon\s*monoxide|injury|bleeding|emergency|asap|urgent|danger)\b/.test(
      text,
    );
  const accessHit =
    /\b(password|locked\s*out|can'?t\s*log\s*in|cannot\s*log\s*in|sso|2fa|mfa|reset\s*link)\b/.test(
      text,
    );
  const billingHit =
    /\b(refund|invoice|billing|charge|payment|card\s*declined|subscription)\b/.test(
      text,
    );
  const shippingHit =
    /\b(shipping|delivery|tracking|package|order\s*#?\d+)\b/.test(text);
  const schedulingHit =
    /\b(appointment|reschedule|cancel\s*visit|booking|availability)\b/.test(
      text,
    );

  if (safetyHit) {
    return {
      priority: "URGENT",
      category: "safety",
      reasonCode: "safety_risk",
      brief: [
        "Possible safety or time-critical issue — contact the customer promptly.",
        "Confirm location/context and whether emergency services are needed.",
        "Do not leave the customer in an AI loop; human ownership required.",
      ],
      model: null,
      source: "heuristic",
    };
  }

  if (accessHit) {
    return {
      priority: "HIGH",
      category: "access",
      reasonCode: "account_access",
      brief: [
        "Customer cannot access their account or auth flow.",
        "Verify identity, then check SSO vs password-reset path.",
        "Share reset steps only after confirming the correct login method.",
      ],
      model: null,
      source: "heuristic",
    };
  }

  if (billingHit) {
    return {
      priority: "HIGH",
      category: "billing",
      reasonCode: "billing_dispute",
      brief: [
        "Billing or payment issue that needs an operator.",
        "Pull invoice/subscription status before promising refunds.",
        "Confirm the billing email and last successful payment.",
      ],
      model: null,
      source: "heuristic",
    };
  }

  if (shippingHit) {
    return {
      priority: "MEDIUM",
      category: "shipping",
      reasonCode: "fulfillment",
      brief: [
        "Fulfillment or delivery question escalated from chat.",
        "Locate the order and share tracking or delay context.",
        "Escalate to ops if the package is missing past the SLA window.",
      ],
      model: null,
      source: "heuristic",
    };
  }

  if (schedulingHit) {
    return {
      priority: "MEDIUM",
      category: "scheduling",
      reasonCode: "schedule_change",
      brief: [
        "Scheduling change requested via chat escalation.",
        "Confirm preferred times and any cancellation policy.",
        "Update the calendar / CRM after agreeing on a slot.",
      ],
      model: null,
      source: "heuristic",
    };
  }

  return {
    priority: "HIGH",
    category: "other",
    reasonCode: "needs_human",
    brief: [
      "Customer asked for a human after chat could not fully resolve the issue.",
      "Read the transcript for the latest ask and any policy already cited.",
      "Reply with a clear next step and ownership.",
    ],
    model: null,
    source: "heuristic",
  };
}

async function completeTriageJson(
  systemPrompt: string,
  userPrompt: string,
): Promise<{ text: string; model: string } | null> {
  if (shouldAttemptGemini()) {
    try {
      const { text, model } = await geminiChatCompletion({
        systemPrompt,
        userPrompt,
        temperature: 0.1,
        maxOutputTokens: 512,
      });
      if (text.trim()) {
        return { text, model };
      }
    } catch (error) {
      console.error("Gemini escalation triage failed:", error);
    }
  }

  const client = getAiClient();
  if (!client) {
    return null;
  }

  const completion = await client.chat.completions.create({
    model: getChatModel(),
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.1,
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) return null;
  return { text, model: getChatModel() };
}

/**
 * Classify an escalation for operators. Never throws — falls back to heuristics.
 */
export async function triageEscalation(
  title: string,
  description: string,
): Promise<EscalationTriage> {
  const fallback = heuristicEscalationTriage(title, description);

  if (!isAiConfigured()) {
    return fallback;
  }

  const systemPrompt = `You triage SMB support escalations for a human operator.
Return ONLY valid JSON with keys:
- priority: one of LOW, MEDIUM, HIGH, URGENT
- category: one of safety, access, billing, product, shipping, scheduling, other
- reasonCode: short snake_case code (e.g. gas_smell, refund_request)
- brief: array of exactly 3 short operator bullets (what happened, what to check, what to do next)

Rules:
- URGENT only for safety, legal risk, or severe outage impacting many users.
- Do not invent order IDs, dollar amounts, or SLA numbers not in the transcript.
- Keep bullets under 140 characters each.`;

  const userPrompt = `Escalation title:
${title.slice(0, 200)}

Transcript / description:
${description.slice(0, 4000)}`;

  try {
    const completion = await completeTriageJson(systemPrompt, userPrompt);
    if (!completion) return fallback;

    const parsed = parseAiTriageJson(completion.text);
    if (!parsed) return fallback;

    return {
      ...parsed,
      model: completion.model,
      source: "ai",
    };
  } catch (error) {
    console.error("Escalation triage failed:", error);
    return fallback;
  }
}
