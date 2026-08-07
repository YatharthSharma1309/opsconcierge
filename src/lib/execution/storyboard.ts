export type StoryboardTone = "neutral" | "success" | "warning" | "danger" | "info";

export type StoryboardStep = {
  id: string;
  stage: "intake" | "retrieve" | "model" | "outcome" | "escalate";
  title: string;
  summary: string;
  agent: string;
  decision: string;
  model: string;
  latencyMs: number | null;
  createdAt: string;
  tone: StoryboardTone;
  details: Array<{ label: string; value: string }>;
};

export type StoryboardLogInput = {
  id: string;
  createdAt: Date | string;
  agent: string;
  trigger: string;
  model: string;
  decision: string;
  latencyMs: number | null;
  metadata?: unknown;
};

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function formatConfidence(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  if (typeof value === "number" && !Number.isNaN(value)) {
    return `${Math.round(value * 100)}%`;
  }
  return null;
}

function formatLatency(latencyMs: number | null) {
  if (latencyMs === null || latencyMs === undefined) return "N/A";
  return `${latencyMs} ms`;
}

function decisionTone(decision: string): StoryboardTone {
  if (
    decision.includes("error") ||
    decision.includes("failed") ||
    decision.includes("no_knowledge")
  ) {
    return "danger";
  }
  if (
    decision.includes("fallback") ||
    decision.includes("low_") ||
    decision === "triage_ready"
  ) {
    return "warning";
  }
  if (
    decision.includes("success") ||
    decision.includes("completed") ||
    decision === "ticket_created" ||
    decision === "deflected"
  ) {
    return "success";
  }
  if (decision.includes("gemini") || decision.includes("route_to")) {
    return "info";
  }
  return "neutral";
}

function stageForLog(agent: string, decision: string): StoryboardStep["stage"] {
  if (agent === "lane-router") return "retrieve";
  if (
    agent === "ticket-updater" ||
    agent === "escalation-triage" ||
    decision === "ticket_created" ||
    decision === "triage_ready"
  ) {
    return "escalate";
  }
  if (
    agent === "gemini" ||
    agent === "openrouter" ||
    agent === "llm" ||
    decision.includes("gemini") ||
    decision.includes("openrouter") ||
    decision.includes("llm_")
  ) {
    return "model";
  }
  return "outcome";
}

function titleForStage(stage: StoryboardStep["stage"], decision: string) {
  switch (stage) {
    case "retrieve":
      return decision.includes("no_knowledge")
        ? "Retrieve — thin knowledge"
        : "Retrieve & route";
    case "model":
      return decision.includes("error") ? "Model reply failed" : "Model reply";
    case "escalate":
      return decision === "triage_ready"
        ? "Escalate + triage"
        : "Escalate to ticket";
    case "outcome":
      return "Outcome";
    default:
      return "Intake";
  }
}

function summaryForLog(
  stage: StoryboardStep["stage"],
  decision: string,
  meta: Record<string, unknown>,
) {
  const confidence = formatConfidence(meta.confidence);
  const chunks =
    typeof meta.chunksMatched === "number" ? meta.chunksMatched : null;
  const retrievalMode =
    typeof meta.retrievalMode === "string" ? meta.retrievalMode : null;
  const outcome = typeof meta.outcome === "string" ? meta.outcome : null;
  const category = typeof meta.category === "string" ? meta.category : null;
  const priority = typeof meta.priority === "string" ? meta.priority : null;

  if (stage === "retrieve") {
    const parts = [
      decision.replace(/_/g, " "),
      chunks !== null ? `${chunks} chunk${chunks === 1 ? "" : "s"} matched` : null,
      confidence ? `confidence ${confidence}` : null,
      retrievalMode ? `via ${retrievalMode}` : null,
    ].filter(Boolean);
    return parts.join(" · ");
  }

  if (stage === "model") {
    const parts = [
      decision.replace(/_/g, " "),
      confidence ? `confidence ${confidence}` : null,
      outcome ? outcome.replace(/_/g, " ") : null,
    ].filter(Boolean);
    return parts.join(" · ");
  }

  if (stage === "escalate") {
    const parts = [
      decision.replace(/_/g, " "),
      priority ? `priority ${priority}` : null,
      category ? `category ${category}` : null,
    ].filter(Boolean);
    return parts.join(" · ");
  }

  return decision.replace(/_/g, " ");
}

export function buildExecutionStoryboard(
  logs: StoryboardLogInput[],
): StoryboardStep[] {
  return logs.map((log) => {
    const meta = asRecord(log.metadata);
    const stage = stageForLog(log.agent, log.decision);
    const confidence = formatConfidence(meta.confidence);
    const details: StoryboardStep["details"] = [
      { label: "Decision", value: log.decision },
      { label: "Model", value: log.model || "N/A" },
      { label: "Latency", value: formatLatency(log.latencyMs) },
    ];

    if (typeof meta.chunksMatched === "number") {
      details.push({ label: "Chunks", value: String(meta.chunksMatched) });
    }
    if (confidence) {
      details.push({ label: "Confidence", value: confidence });
    }
    if (typeof meta.retrievalMode === "string") {
      details.push({ label: "Retrieval", value: meta.retrievalMode });
    }
    if (typeof meta.outcome === "string") {
      details.push({ label: "Outcome", value: meta.outcome });
    }
    if (typeof meta.provider === "string") {
      details.push({ label: "Provider", value: meta.provider });
    }
    if (typeof meta.priority === "string") {
      details.push({ label: "Priority", value: meta.priority });
    }
    if (typeof meta.category === "string") {
      details.push({ label: "Category", value: meta.category });
    }
    if (typeof meta.reasonCode === "string") {
      details.push({ label: "Reason", value: meta.reasonCode });
    }
    if (typeof meta.ticketId === "string") {
      details.push({ label: "Ticket", value: meta.ticketId });
    }

    return {
      id: log.id,
      stage,
      title: titleForStage(stage, log.decision),
      summary: summaryForLog(stage, log.decision, meta),
      agent: log.agent,
      decision: log.decision,
      model: log.model,
      latencyMs: log.latencyMs,
      createdAt:
        typeof log.createdAt === "string"
          ? log.createdAt
          : log.createdAt.toISOString(),
      tone: decisionTone(log.decision),
      details,
    };
  });
}

export function storyboardHeadline(steps: StoryboardStep[]) {
  const escalate = steps.find((step) => step.stage === "escalate");
  if (escalate) {
    return escalate.decision === "triage_ready"
      ? "Escalated with AI triage"
      : "Escalated to a human ticket";
  }

  const model = [...steps].reverse().find((step) => step.stage === "model");
  if (model?.decision.includes("error")) {
    return "Model reply failed";
  }
  if (model) {
    const outcome = model.details.find((d) => d.label === "Outcome")?.value;
    if (outcome === "low_knowledge" || outcome === "low_confidence") {
      return "Answered with low confidence";
    }
    return "Deflected with a grounded reply";
  }

  if (steps.some((step) => step.decision.includes("no_knowledge"))) {
    return "Routed with no matching knowledge";
  }

  return steps.length > 0 ? "Run in progress" : "No steps logged";
}
