import type { BrowserTab, DomInjectionAdapter, RuntimeAdapter, RuntimeEnvelope, RuntimeResponse, TabsAdapter } from "../ports";
export declare class MockRuntimeAdapter implements RuntimeAdapter {
    private handler;
    send<TResponse>(message: RuntimeEnvelope): Promise<RuntimeResponse<TResponse>>;
    onMessage(handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse): () => void;
}
export declare class MockTabsAdapter implements TabsAdapter {
    private tabs;
    queryCurrent(): Promise<BrowserTab | null>;
    list(): Promise<BrowserTab[]>;
}
export declare class MockDomInjectionAdapter implements DomInjectionAdapter {
    private readonly handlers;
    constructor(handlers: Record<string, (payload?: unknown) => unknown | Promise<unknown>>);
    execute<T>(_tabId: number, taskName: string, payload?: unknown): Promise<T>;
}
//# sourceMappingURL=mockBrowserAdapters.d.ts.map