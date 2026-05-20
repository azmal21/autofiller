import { useMemo, useState } from "react";
import { Activity, CheckCircle2, Play, ScanSearch, Wand2 } from "lucide-react";
import { AppShell, Button, Card, LogPanel, Metric, type NavKey } from "@autofill/ui";
import { runtimeBus } from "./mockRuntime";
import { useStudioStore } from "./store";
import { PlaygroundForm } from "./components/PlaygroundForm";
import { WorkflowInspector } from "./components/WorkflowInspector";
import { ProfileSettings } from "./components/ProfileSettings";

export function App() {
  const [active, setActive] = useState<NavKey>("dashboard");
  const { profile, scan, plan, results, logs } = useStudioStore();

  const title = useMemo(() => {
    const labels: Record<NavKey, string> = {
      dashboard: "Dashboard",
      activity: "Activity Panel",
      workflow: "Workflow Builder",
      matches: "Job Match Results",
      logs: "Logs Debugger",
      settings: "Settings",
    };
    return labels[active];
  }, [active]);

  async function scanWorkflow() {
    await runtimeBus.request("workflow:scan", { tabId: 1 });
  }

  async function planWorkflow() {
    await runtimeBus.request("workflow:plan", { tabId: 1, profile });
  }

  async function runWorkflow() {
    await runtimeBus.request("workflow:run", { tabId: 1, profile });
  }

  return (
    <AppShell active={active} onNavigate={setActive} title={title} rightRail={<LogPanel logs={logs} />}>
      {active === "settings" ? <ProfileSettings /> : null}

      {active !== "settings" ? (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-3">
            <Metric label="Fields" value={scan?.fields.length ?? 0} />
            <Metric label="Tasks" value={plan?.tasks.length ?? 0} tone="good" />
            <Metric label="Skipped" value={plan?.skipped.length ?? 0} tone="warn" />
            <Metric label="Success" value={results.filter((result) => result.status === "success").length} tone="good" />
          </div>

          <div className="flex items-center gap-2">
            <Button icon={<ScanSearch size={16} />} onClick={scanWorkflow}>Scan</Button>
            <Button icon={<Wand2 size={16} />} onClick={planWorkflow}>Plan</Button>
            <Button variant="primary" icon={<Play size={16} />} onClick={runWorkflow}>Run Autofill</Button>
            <Button variant="ghost" icon={<CheckCircle2 size={16} />} onClick={() => setActive("matches")}>Inspect Matches</Button>
          </div>

          {active === "dashboard" || active === "activity" ? (
            <div className="grid grid-cols-[minmax(0,1fr)_380px] gap-5">
              <PlaygroundForm />
              <WorkflowInspector compact={active === "dashboard"} />
            </div>
          ) : null}

          {active === "workflow" || active === "matches" || active === "logs" ? (
            <Card className="p-4">
              <WorkflowInspector />
            </Card>
          ) : null}
        </div>
      ) : null}

      {active === "logs" ? (
        <div className="mt-5 rounded-lg border border-line bg-white/60 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Activity size={16} />
            Runtime messaging is mocked in-process. No `chrome.*` APIs are loaded in this app.
          </div>
        </div>
      ) : null}
    </AppShell>
  );
}
