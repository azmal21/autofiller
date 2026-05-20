import { createLogger, defaultProfile, type AutofillProfile } from "@autofill/core";
import type { RuntimeEnvelope, RuntimeResponse } from "@autofill/shared";
import { ChromeRuntimeAdapter } from "../adapters/chromeRuntimeAdapter";
import { ChromeStorageAdapter } from "../adapters/chromeStorageAdapter";
import { ChromeTabsAdapter } from "../adapters/chromeTabsAdapter";
import { logStore } from "./logStore";

const runtime = new ChromeRuntimeAdapter();
const storage = new ChromeStorageAdapter();
const tabs = new ChromeTabsAdapter();
const logger = createLogger("background", (entry) => logStore.push(entry));

runtime.onMessage(handleMessage);

async function handleMessage(message: RuntimeEnvelope): Promise<RuntimeResponse> {
  try {
    if (message.type === "profile:get") {
      return { ok: true, data: (await storage.get<AutofillProfile>("profile")) ?? defaultProfile };
    }

    if (message.type === "profile:set") {
      await storage.set("profile", message.payload);
      logger.info("profile_saved");
      return { ok: true, data: { saved: true } };
    }

    if (message.type === "logs:list") {
      return { ok: true, data: logStore.list() };
    }

    if (message.type === "logs:clear") {
      logStore.clear();
      return { ok: true, data: { cleared: true } };
    }

    if (message.type === "workflow:scan" || message.type === "workflow:plan" || message.type === "workflow:run") {
      const payload = message.payload as { tabId?: number; profile?: AutofillProfile };
      const currentTab = payload.tabId ? { id: payload.tabId } : await tabs.queryCurrent();
      if (!currentTab?.id) return { ok: false, error: "active_tab_missing" };

      const profile = payload.profile ?? (await storage.get<AutofillProfile>("profile")) ?? defaultProfile;
      const response = await chrome.tabs.sendMessage(currentTab.id, {
        ...message,
        payload: { ...payload, profile },
      });
      return response as RuntimeResponse;
    }

    return { ok: false, error: `unknown_message:${message.type}` };
  } catch (error) {
    logger.error("background_message_failed", { type: message.type, error });
    return { ok: false, error: error instanceof Error ? error.message : "background_message_failed" };
  }
}
