import { Card } from "@autofill/ui";
import { useStudioStore } from "../store";

export function WorkflowInspector({ compact = false }: { compact?: boolean }) {
  const { scan, plan, results } = useStudioStore();

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Workflow Inspector</div>
            <div className="text-xs text-stone-500">Scan, matching, plan, and execution state.</div>
          </div>
          <div className="rounded-md bg-white/70 px-2 py-1 text-xs text-stone-600">{plan?.elapsedMs ?? 0}ms plan</div>
        </div>
        <div className="space-y-2">
          {(compact ? plan?.plannedFields.slice(0, 6) : plan?.plannedFields)?.map((field) => (
            <div key={field.id} className="rounded-md border border-line bg-white/65 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{field.label || field.name || field.placeholder || field.selector}</div>
                  <div className="mt-1 text-xs text-stone-500">{field.searchText}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-accent">{field.match.semantic}</div>
                  <div className="text-xs text-stone-500">{Math.round(field.match.confidence * 100)}%</div>
                </div>
              </div>
            </div>
          ))}
          {!plan?.plannedFields.length ? (
            <div className="rounded-md border border-dashed border-line p-6 text-center text-sm text-stone-500">
              Run Scan or Plan to inspect workflow decisions.
            </div>
          ) : null}
        </div>
      </Card>

      {!compact ? (
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="mb-2 text-sm font-semibold">Scanned Fields</div>
            <div className="max-h-72 overflow-auto text-xs">
              {(scan?.fields ?? []).map((field) => (
                <div key={field.id} className="border-b border-line py-2 last:border-b-0">
                  <div className="font-medium">{field.selector}</div>
                  <div className="text-stone-500">{field.searchText || "no searchable metadata"}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <div className="mb-2 text-sm font-semibold">Execution Results</div>
            <div className="max-h-72 overflow-auto text-xs">
              {results.map((result) => (
                <div key={result.taskId} className="flex items-center justify-between border-b border-line py-2 last:border-b-0">
                  <span>{result.fieldId}</span>
                  <span className={result.status === "success" ? "text-emerald-700" : "text-amber-700"}>{result.status}</span>
                </div>
              ))}
              {!results.length ? <div className="py-4 text-stone-500">No run results yet.</div> : null}
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
