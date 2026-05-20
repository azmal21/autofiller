import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Bug, Play, ScanSearch, Wand2 } from "lucide-react";
import type { AutofillPlan, AutofillProfile, FieldScanResult, RuntimeLog, TaskResult } from "@autofill/core";
import { Button, Card, Metric } from "@autofill/ui";
import { RuntimeBus } from "@autofill/shared";
import { ChromeRuntimeAdapter } from "../adapters/chromeRuntimeAdapter";
import "../styles.css";

const bus = new RuntimeBus(new ChromeRuntimeAdapter(), { timeoutMs: 6000, retries: 1 });

function PopupApp() {
  const [profile, setProfile] = useState<AutofillProfile>({});
  const [scan, setScan] = useState<FieldScanResult>();
  const [plan, setPlan] = useState<AutofillPlan>();
  const [results, setResults] = useState<TaskResult[]>([]);
  const [logs, setLogs] = useState<RuntimeLog[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void bus.request("profile:get", undefined).then(setProfile);
    void refreshLogs();
  }, []);

  async function refreshLogs() {
    setLogs(await bus.request("logs:list", undefined));
  }

  async function run<T>(work: () => Promise<T>) {
    setBusy(true);
    try {
      return await work();
    } finally {
      setBusy(false);
      await refreshLogs();
    }
  }

  return (
    <div className="w-[430px] bg-panel p-4 text-ink">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-base font-semibold">Autofill Studio</div>
          <div className="text-xs text-stone-500">Shared MV3 workflow runner</div>
        </div>
        <Button variant="ghost" icon={<Bug size={16} />} onClick={refreshLogs}>Logs</Button>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Metric label="Fields" value={scan?.fields.length ?? 0} />
        <Metric label="Tasks" value={plan?.tasks.length ?? 0} tone="good" />
        <Metric label="Done" value={results.filter((result) => result.status === "success").length} tone="good" />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Button disabled={busy} icon={<ScanSearch size={15} />} onClick={() => run(async () => setScan(await bus.request("workflow:scan", {})))}>Scan</Button>
        <Button disabled={busy} icon={<Wand2 size={15} />} onClick={() => run(async () => setPlan(await bus.request("workflow:plan", { profile })))}>Plan</Button>
        <Button disabled={busy} variant="primary" icon={<Play size={15} />} onClick={() => run(async () => {
          const response = await bus.request("workflow:run", { profile });
          setPlan(response.plan);
          setResults(response.results);
        })}>Run</Button>
      </div>

      <Card className="max-h-72 overflow-auto p-3">
        <div className="mb-2 text-sm font-semibold">Matches</div>
        {plan?.plannedFields.map((field) => (
          <div key={field.id} className="border-b border-line py-2 text-xs last:border-b-0">
            <div className="flex justify-between gap-2">
              <span className="truncate font-medium">{field.label || field.name || field.selector}</span>
              <span className="text-accent">{field.match.semantic}</span>
            </div>
            <div className="text-stone-500">{Math.round(field.match.confidence * 100)}% confidence</div>
          </div>
        ))}
        {!plan?.plannedFields.length ? <div className="py-5 text-center text-sm text-stone-500">No plan yet.</div> : null}
      </Card>

      <div className="mt-3 max-h-24 overflow-auto rounded-md bg-ink p-2 font-mono text-[11px] text-stone-300">
        {logs.slice(0, 6).map((log) => (
          <div key={log.id}>{log.level.toUpperCase()} {log.message}</div>
        ))}
        {!logs.length ? "No logs yet." : null}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>,
);
