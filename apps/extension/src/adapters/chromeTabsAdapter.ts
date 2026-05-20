import type { BrowserTab, TabsAdapter } from "@autofill/shared";

export class ChromeTabsAdapter implements TabsAdapter {
  async queryCurrent(): Promise<BrowserTab | null> {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab?.id ? toBrowserTab(tab) : null;
  }

  async list(): Promise<BrowserTab[]> {
    const tabs = await chrome.tabs.query({});
    return tabs.filter((tab) => tab.id).map(toBrowserTab);
  }
}

function toBrowserTab(tab: chrome.tabs.Tab): BrowserTab {
  return {
    id: tab.id ?? -1,
    title: tab.title ?? "Untitled",
    url: tab.url ?? "",
    active: Boolean(tab.active),
  };
}
