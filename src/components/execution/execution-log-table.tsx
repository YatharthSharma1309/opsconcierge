import { formatDate } from "@/lib/utils";

type ExecutionLogEntryRow = {
  id: string;
  createdAt: Date | string;
  workspaceId: string;
  agent: string;
  trigger: string;
  model: string;
  decision: string;
  latencyMs: number | null;
};

export function ExecutionLogTable({
  logs,
}: {
  logs: ExecutionLogEntryRow[];
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-500">
        Gemini evidence is provable from the{" "}
        <span className="font-medium">Model</span> column (screenshot-friendly).
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-slate-500">No execution logs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Timestamp</th>
                <th className="px-4 py-3 font-medium">workspace_id</th>
                <th className="px-4 py-3 font-medium">agent</th>
                <th className="px-4 py-3 font-medium">trigger</th>
                <th className="px-4 py-3 font-medium">model</th>
                <th className="px-4 py-3 font-medium">decision</th>
                <th className="px-4 py-3 font-medium">latency</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-foreground/[0.05]"
                >
                  <td className="px-4 py-4 text-slate-600">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-4 py-4 font-mono text-xs text-slate-600">
                    {log.workspaceId}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{log.agent}</td>
                  <td className="px-4 py-4 text-slate-700">{log.trigger}</td>
                  <td className="px-4 py-4 font-mono text-xs text-blue-900">
                    {log.model}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{log.decision}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {log.latencyMs === null || log.latencyMs === undefined
                      ? "N/A"
                      : `${log.latencyMs} ms`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

