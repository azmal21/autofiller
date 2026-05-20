import type { RuntimeLog } from "@autofill/core";
export interface StorageAdapter {
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
}
export interface RuntimeEnvelope<TType extends string = string, TPayload = unknown> {
    id: string;
    type: TType;
    payload: TPayload;
    createdAt: number;
}
export interface RuntimeResponse<T = unknown> {
    ok: boolean;
    data?: T;
    error?: string;
}
export interface RuntimeAdapter {
    send<TResponse>(message: RuntimeEnvelope): Promise<RuntimeResponse<TResponse>>;
    onMessage(handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse): () => void;
}
export interface BrowserTab {
    id: number;
    title: string;
    url: string;
    active: boolean;
}
export interface TabsAdapter {
    queryCurrent(): Promise<BrowserTab | null>;
    list(): Promise<BrowserTab[]>;
}
export interface DomInjectionAdapter {
    execute<T>(tabId: number, taskName: string, payload?: unknown): Promise<T>;
}
export interface LogSink {
    push(entry: RuntimeLog): void;
    list(): RuntimeLog[];
    clear(): void;
}
//# sourceMappingURL=ports.d.ts.map