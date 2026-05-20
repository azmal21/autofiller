import type { StorageAdapter } from "@autofill/shared";
export declare class ChromeStorageAdapter implements StorageAdapter {
    private readonly area;
    constructor(area?: chrome.storage.StorageArea);
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
}
//# sourceMappingURL=chromeStorageAdapter.d.ts.map