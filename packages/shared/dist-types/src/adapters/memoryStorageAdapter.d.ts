import type { StorageAdapter } from "../ports";
export declare class MemoryStorageAdapter implements StorageAdapter {
    private readonly store;
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
}
//# sourceMappingURL=memoryStorageAdapter.d.ts.map