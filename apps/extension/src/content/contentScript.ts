import { createAutofillPlan, createLogger, runFillTasks, scanFieldHandles, type AutofillProfile } from "@autofill/core";
import type { RuntimeEnvelope, RuntimeResponse } from "@autofill/shared";

const logger = createLogger("content");

chrome.runtime.onMessage.addListener(
  (message: RuntimeEnvelope, _sender: chrome.runtime.MessageSender, sendResponse: (response: RuntimeResponse) => void) => {
    Promise.resolve(handleContentMessage(message))
      .then(sendResponse)
      .catch((error) => sendResponse({ ok: false, error: error instanceof Error ? error.message : "content_error" }));
    return true;
  },
);

async function handleContentMessage(message: RuntimeEnvelope): Promise<RuntimeResponse> {
  const scan = scanFieldHandles(document);

  if (message.type === "workflow:scan") {
    logger.info("content_scan_complete", { fields: scan.fields.length });
    return { ok: true, data: { fields: scan.fields, elapsedMs: scan.elapsedMs } };
  }

  if (message.type === "workflow:plan" || message.type === "workflow:run") {
    const payload = message.payload as { profile?: AutofillProfile; dryRun?: boolean };
    const plan = createAutofillPlan(scan.fields, payload.profile ?? {}, { logger });

    if (message.type === "workflow:plan" || payload.dryRun) {
      return { ok: true, data: plan };
    }

    const elementById = new Map(scan.handles.map((handle) => [handle.descriptor.id, handle.element]));
    const results = await runFillTasks(plan.tasks, (task) => elementById.get(task.fieldId) ?? null, {
      logger,
      textDelayMs: 0,
    });
    return { ok: true, data: { plan, results } };
  }

  return { ok: false, error: `unknown_content_message:${message.type}` };
}
