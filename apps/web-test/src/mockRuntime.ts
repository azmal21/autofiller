import {
  createAutofillPlan,
  createLogger,
  runFillTasks,
  scanFieldHandles,
  type AutofillProfile,
  type RuntimeLog,
} from "@autofill/core";
import { MemoryStorageAdapter, MockRuntimeAdapter, RuntimeBus, type RuntimeEnvelope, type RuntimeResponse } from "@autofill/shared";
import { useStudioStore } from "./store";

const storage = new MemoryStorageAdapter();
const adapter = new MockRuntimeAdapter();
export const runtimeBus = new RuntimeBus(adapter, { timeoutMs: 2500, retries: 0 });

adapter.onMessage(handleMessage);

async function handleMessage(message: RuntimeEnvelope): Promise<RuntimeResponse> {
  const store = useStudioStore.getState();
  const logger = createLogger("web-test", (entry: RuntimeLog) => store.pushLog(entry));

  try {
    if (message.type === "profile:get") {
      return { ok: true, data: (await storage.get<AutofillProfile>("profile")) ?? store.profile };
    }

    if (message.type === "profile:set") {
      await storage.set("profile", message.payload);
      store.setProfile(message.payload as AutofillProfile);
      logger.info("profile_saved");
      return { ok: true, data: { saved: true } };
    }

    if (message.type === "logs:list") {
      return { ok: true, data: store.logs };
    }

    if (message.type === "logs:clear") {
      store.clearLogs();
      return { ok: true, data: { cleared: true } };
    }

    if (message.type === "workflow:scan") {
      const form = document.querySelector("[data-playground-form]") ?? document;
      const scan = scanFieldHandles(form);
      store.setScan(scan);
      logger.info("fields_scanned", { count: scan.fields.length, elapsedMs: scan.elapsedMs });
      return { ok: true, data: { fields: scan.fields, elapsedMs: scan.elapsedMs } };
    }

    if (message.type === "workflow:plan" || message.type === "workflow:run") {
      const payload = message.payload as { profile?: AutofillProfile; dryRun?: boolean };
      const form = document.querySelector("[data-playground-form]") ?? document;
      const scan = scanFieldHandles(form);
      const profile = payload.profile ?? store.profile;
      const plan = createAutofillPlan(scan.fields, profile, { logger });
      store.setScan({ fields: scan.fields, elapsedMs: scan.elapsedMs });
      store.setPlan(plan);

      if (message.type === "workflow:plan" || payload.dryRun) {
        return { ok: true, data: plan };
      }

      const elements = new Map(scan.handles.map((handle) => [handle.descriptor.id, handle.element]));
      const results = await runFillTasks(plan.tasks, (task) => elements.get(task.fieldId) ?? null, {
        logger,
        textDelayMs: 0,
      });
      store.setResults(results);
      logger.info("workflow_run_complete", { tasks: plan.tasks.length, success: results.filter((result) => result.status === "success").length });
      return { ok: true, data: { plan, results } };
    }

    return { ok: false, error: `unknown_message:${message.type}` };
  } catch (error) {
    logger.error("runtime_error", { error });
    return { ok: false, error: error instanceof Error ? error.message : "runtime_error" };
  }
}
