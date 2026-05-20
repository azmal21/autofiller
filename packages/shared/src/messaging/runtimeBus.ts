import type { MessageRequest, MessageResponse, MessageType } from "./contracts";
import type { RuntimeAdapter, RuntimeEnvelope, RuntimeResponse } from "../ports";

export interface RuntimeBusOptions {
  timeoutMs?: number;
  retries?: number;
}

export class RuntimeBus {
  constructor(
    private readonly adapter: RuntimeAdapter,
    private readonly options: RuntimeBusOptions = {},
  ) {}

  async request<TType extends MessageType>(
    type: TType,
    payload: MessageRequest<TType>,
    options: RuntimeBusOptions = {},
  ): Promise<MessageResponse<TType>> {
    const timeoutMs = options.timeoutMs ?? this.options.timeoutMs ?? 5000;
    const retries = options.retries ?? this.options.retries ?? 1;
    const envelope: RuntimeEnvelope<TType, MessageRequest<TType>> = {
      id: crypto.randomUUID(),
      type,
      payload,
      createdAt: Date.now(),
    };

    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      try {
        const response = await withTimeout(this.adapter.send<MessageResponse<TType>>(envelope), timeoutMs);
        if (!response.ok) {
          throw new Error(response.error ?? "runtime_request_failed");
        }
        return response.data as MessageResponse<TType>;
      } catch (error) {
        lastError = error;
        if (attempt === retries) break;
      }
    }

    throw lastError instanceof Error ? lastError : new Error("runtime_request_failed");
  }

  onMessage(
    handler: (message: RuntimeEnvelope) => Promise<RuntimeResponse> | RuntimeResponse,
  ): () => void {
    return this.adapter.onMessage(handler);
  }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof globalThis.setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = globalThis.setTimeout(() => reject(new Error("runtime_request_timeout")), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) globalThis.clearTimeout(timer);
  }
}
