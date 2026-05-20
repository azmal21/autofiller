import type { RuntimeLog } from "@autofill/core";

interface LogPanelProps {
  logs: RuntimeLog[];
}

export function LogPanel({ logs }: LogPanelProps) {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-line bg-[#151819] text-stone-100">
      <div className="border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
        Logs
      </div>
      <div className="max-h-[620px] space-y-2 overflow-auto p-3 font-mono text-xs">
        {logs.length === 0 ? <div className="text-stone-500">No events yet.</div> : null}
        {logs.map((log) => (
          <div key={log.id} className="rounded border border-white/10 bg-white/[0.04] p-2">
            <div className="flex items-center justify-between text-stone-400">
              <span>{log.level.toUpperCase()} / {log.source}</span>
              <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
            </div>
            <div className="mt-1 text-stone-100">{log.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
