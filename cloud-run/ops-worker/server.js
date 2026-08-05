/**
 * Minimal OpsConcierge Cloud Run worker.
 * Purpose: prove at least one Google Cloud product in the deployed stack.
 *
 * Endpoints:
 *   GET  /healthz
 *   POST /v1/agent-runs  — accepts execution-log payloads; writes to stdout (Cloud Logging)
 *                        and optionally to GCS if GCS_BUCKET is set.
 *
 * Deploy (after gcloud auth):
 *   gcloud run deploy opsconcierge-worker \
 *     --source . \
 *     --region us-central1 \
 *     --allow-unauthenticated \
 *     --set-env-vars "GCS_BUCKET=your-bucket"
 */

import http from "node:http";
import { URL } from "node:url";

const PORT = Number(process.env.PORT || 8080);
const GCS_BUCKET = process.env.GCS_BUCKET?.trim() || "";

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  }
}

async function maybeWriteGcs(objectName, data) {
  if (!GCS_BUCKET) return { stored: false, reason: "GCS_BUCKET unset" };

  // Lazy import so local health checks work without @google-cloud/storage installed.
  // When deploying with GCS enabled, install the package or swap to signed REST uploads.
  try {
    const { Storage } = await import("@google-cloud/storage");
    const storage = new Storage();
    const file = storage.bucket(GCS_BUCKET).file(objectName);
    await file.save(JSON.stringify(data, null, 2), {
      contentType: "application/json",
      resumable: false,
    });
    return { stored: true, bucket: GCS_BUCKET, object: objectName };
  } catch (err) {
    console.error("gcs_write_failed", {
      message: err instanceof Error ? err.message : String(err),
    });
    return {
      stored: false,
      reason: err instanceof Error ? err.message : "gcs write failed",
    };
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/healthz") {
    return json(res, 200, {
      ok: true,
      service: "opsconcierge-worker",
      gcsConfigured: Boolean(GCS_BUCKET),
    });
  }

  if (req.method === "POST" && url.pathname === "/v1/agent-runs") {
    const body = await readBody(req);
    if (!body || typeof body !== "object") {
      return json(res, 400, { ok: false, error: "JSON body required" });
    }

    const run = {
      receivedAt: new Date().toISOString(),
      workspace_id: body.workspace_id ?? null,
      agent: body.agent ?? null,
      trigger: body.trigger ?? null,
      model: body.model ?? null,
      decision: body.decision ?? null,
      latency_ms: body.latency_ms ?? null,
      summary: body.summary ?? null,
    };

    // Cloud Logging evidence (stdout is captured automatically on Cloud Run).
    console.info("opsconcierge_agent_run", run);

    const objectName = `agent-runs/${run.workspace_id || "unknown"}/${Date.now()}.json`;
    const gcs = await maybeWriteGcs(objectName, run);

    return json(res, 200, { ok: true, run, gcs });
  }

  return json(res, 404, { ok: false, error: "not found" });
});

server.listen(PORT, () => {
  console.info("opsconcierge-worker listening", { port: PORT });
});
