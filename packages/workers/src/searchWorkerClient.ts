import type { FieldDescriptor, FieldMatch } from "@autofill/core";
import type { WorkerEnvelope, WorkerMessageType, WorkerReply, WorkerRequestMap } from "./types";

export class SearchWorkerClient {
  private readonly pending = new Map<
    string,
    { resolve(value: unknown): void; reject(reason?: unknown): void; timer: ReturnType<typeof globalThis.setTimeout> }
  >();

  constructor(private readonly worker: Worker) {
    this.worker.addEventListener("message", (event: MessageEvent<WorkerReply>) => {
      const reply = event.data;
      const pending = this.pending.get(reply.id);
      if (!pending) return;

      globalThis.clearTimeout(pending.timer);
      this.pending.delete(reply.id);
      if (reply.ok) pending.resolve(reply.data);
      else pending.reject(new Error(reply.error ?? "worker_request_failed"));
    });
  }

  search(query: string, limit?: number): Promise<FieldMatch[]> {
    return this.request("matcher:search", limit === undefined ? { query } : { query, limit });
  }

  matchFields(fields: FieldDescriptor[]): Promise<Array<{ fieldId: string; match: FieldMatch | null }>> {
    return this.request("matcher:match-fields", { fields });
  }

  request<TType extends WorkerMessageType>(
    type: TType,
    payload: WorkerRequestMap[TType]["request"],
    timeoutMs = 3500,
  ): Promise<WorkerRequestMap[TType]["response"]> {
    const id = crypto.randomUUID();
    const envelope: WorkerEnvelope<TType> = { id, type, payload };

    return new Promise((resolve, reject) => {
      const timer = globalThis.setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("worker_request_timeout"));
      }, timeoutMs);

      this.pending.set(id, { resolve: resolve as (value: unknown) => void, reject, timer });
      this.worker.postMessage(envelope);
    });
  }

  destroy() {
    this.pending.forEach((pending) => {
      globalThis.clearTimeout(pending.timer);
      pending.reject(new Error("worker_destroyed"));
    });
    this.pending.clear();
    this.worker.terminate();
  }
}
