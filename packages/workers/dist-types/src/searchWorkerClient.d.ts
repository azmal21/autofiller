import type { FieldDescriptor, FieldMatch } from "@autofill/core";
import type { WorkerMessageType, WorkerRequestMap } from "./types";
export declare class SearchWorkerClient {
    private readonly worker;
    private readonly pending;
    constructor(worker: Worker);
    search(query: string, limit?: number): Promise<FieldMatch[]>;
    matchFields(fields: FieldDescriptor[]): Promise<Array<{
        fieldId: string;
        match: FieldMatch | null;
    }>>;
    request<TType extends WorkerMessageType>(type: TType, payload: WorkerRequestMap[TType]["request"], timeoutMs?: number): Promise<WorkerRequestMap[TType]["response"]>;
    destroy(): void;
}
//# sourceMappingURL=searchWorkerClient.d.ts.map