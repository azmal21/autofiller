import type { FieldDescriptor, FieldMatch } from "@autofill/core";

export interface WorkerRequestMap {
  "matcher:search": {
    request: { query: string; limit?: number };
    response: FieldMatch[];
  };
  "matcher:match-fields": {
    request: { fields: FieldDescriptor[] };
    response: Array<{ fieldId: string; match: FieldMatch | null }>;
  };
}

export type WorkerMessageType = keyof WorkerRequestMap;

export interface WorkerEnvelope<TType extends WorkerMessageType = WorkerMessageType> {
  id: string;
  type: TType;
  payload: WorkerRequestMap[TType]["request"];
}

export interface WorkerReply<T = unknown> {
  id: string;
  ok: boolean;
  data?: T;
  error?: string;
}
