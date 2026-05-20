import type { BrowserTab, TabsAdapter } from "@autofill/shared";
export declare class ChromeTabsAdapter implements TabsAdapter {
    queryCurrent(): Promise<BrowserTab | null>;
    list(): Promise<BrowserTab[]>;
}
//# sourceMappingURL=chromeTabsAdapter.d.ts.map