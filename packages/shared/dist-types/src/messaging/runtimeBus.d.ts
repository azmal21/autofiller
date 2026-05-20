import type { MessageRequest, MessageResponse, MessageType } from "./contracts";
import type { RuntimeAdapter, RuntimeEnvelope, RuntimeResponse } from "../ports";
export interface RuntimeBusOptions {
    timeoutMs?: number;
    retries?: number;
}
export declare class RuntimeBus {
    private readonly adapter;
    private readonly options;
    constructor(adapter: RuntimeAdapter, options?: RuntimeBusOptions);
    request<TType extends MessageType>(type: TType, payload: MessageRequest<TType>, options?: RuntimeBusOptions): Promise<MessageResponse<TType>>;
    onMessage(handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse): () => void;
}
//# sourceMappingURL=runtimeBus.d.ts.map