import type { RuntimeAdapter, RuntimeEnvelope, RuntimeResponse } from "@autofill/shared";
export declare class ChromeRuntimeAdapter implements RuntimeAdapter {
    send<TResponse>(message: RuntimeEnvelope): Promise<RuntimeResponse<TResponse>>;
    onMessage(handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse): () => void;
}
//# sourceMappingURL=chromeRuntimeAdapter.d.ts.map