/**
 * Free Google Cloud evidence path (no gcloud CLI, no paid services, no new packages).
 *
 * Primary: Firebase Realtime Database REST (Spark free plan, open rules for hackathon).
 * Optional fallback: OPS_WORKER_URL (Cloud Run) if you ever deploy one.
 *
 * Why RTDB (not Firestore)? Firestore REST requires OAuth/ID tokens.
 * RTDB allows plain POST when security rules permit writes (demo-friendly).
 */

export type AgentRunPayload = {
  workspace_id?: string | null;
  agent?: string | null;
  trigger?: string | null;
  model?: string | null;
  decision?: string | null;
  latency_ms?: number | null;
  summary?: string | null;
};

function getRtdbConfig() {
  const databaseUrl = process.env.FIREBASE_DATABASE_URL?.trim().replace(/\/$/, "");
  const path =
    process.env.FIREBASE_RTDB_PATH?.trim().replace(/^\/|\/$/g, "") ||
    "opsconcierge_agent_runs";

  if (!databaseUrl) return null;
  return { databaseUrl, path };
}

export function getOpsWorkerUrl() {
  return process.env.OPS_WORKER_URL?.trim() || null;
}

export function isGcpEvidenceConfigured() {
  return Boolean(getRtdbConfig() || getOpsWorkerUrl());
}

async function writeRealtimeDb(payload: AgentRunPayload) {
  const config = getRtdbConfig();
  if (!config) return { sent: false as const, reason: "firebase rtdb unset" };

  const url = `${config.databaseUrl}/${config.path}.json`;
  const body = {
    ...payload,
    received_at: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(2500),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.warn("firebase_rtdb_write_failed", {
      status: res.status,
      body: text.slice(0, 240),
    });
    return { sent: false as const, reason: `HTTP ${res.status}` };
  }

  const data = (await res.json().catch(() => null)) as { name?: string } | null;
  console.info("firebase_rtdb_agent_run", {
    path: config.path,
    key: data?.name ?? null,
  });

  return { sent: true as const, target: "firebase_rtdb" as const };
}

async function writeCloudRun(payload: AgentRunPayload) {
  const base = getOpsWorkerUrl();
  if (!base) return { sent: false as const, reason: "OPS_WORKER_URL unset" };

  const res = await fetch(`${base.replace(/\/$/, "")}/v1/agent-runs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(2500),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.warn("ops_worker_notify_failed", {
      status: res.status,
      body: text.slice(0, 200),
    });
    return { sent: false as const, reason: `HTTP ${res.status}` };
  }

  return { sent: true as const, target: "cloud_run" as const };
}

/** Prefer free Firebase RTDB; fall back to Cloud Run URL if set. */
export async function notifyOpsWorker(payload: AgentRunPayload) {
  try {
    if (getRtdbConfig()) {
      return await writeRealtimeDb(payload);
    }
    if (getOpsWorkerUrl()) {
      return await writeCloudRun(payload);
    }
    return { sent: false as const, reason: "no free GCP target configured" };
  } catch (err) {
    console.warn("gcp_evidence_notify_error", {
      message: err instanceof Error ? err.message : String(err),
    });
    return {
      sent: false as const,
      reason: err instanceof Error ? err.message : "notify failed",
    };
  }
}
