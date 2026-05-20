import type { StorageAdapter } from "../ports";
export declare class LocalStorageAdapter implements StorageAdapter {
    private readonly namespace;
    constructor(namespace?: string);
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    private toKey;
}
//# sourceMappingURL=localStorageAdapter.d.ts.map