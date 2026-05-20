import { FuseFieldMatcher } from "@autofill/core";
import type { WorkerEnvelope, WorkerReply, WorkerRequestMap } from "./types";

const matcher = new FuseFieldMatcher();

self.addEventListener("message", (event: MessageEvent<WorkerEnvelope>) => {
  const message = event.data;
  respond(message, handle(message));
});

async function handle<TType extends keyof WorkerRequestMap>(
  message: WorkerEnvelope<TType>,
): Promise<WorkerRequestMap[TType]["response"]> {
  if (message.type === "matcher:search") {
    const payload = message.payload as WorkerRequestMap["matcher:search"]["request"];
    return matcher.search(payload.query, payload.limit) as WorkerRequestMap[TType]["response"];
  }

  if (message.type === "matcher:match-fields") {
    const payload = message.payload as WorkerRequestMap["matcher:match-fields"]["request"];
    return payload.fields.map((field) => ({ fieldId: field.id, match: matcher.match(field) })) as WorkerRequestMap[TType]["response"];
  }

  throw new Error(`unknown_worker_message:${String(message.type)}`);
}

function respond(message: WorkerEnvelope, promise: Promise<unknown>) {
  promise
    .then((data) => postMessage({ id: message.id, ok: true, data } satisfies WorkerReply))
    .catch((error) =>
      postMessage({
        id: message.id,
        ok: false,
        error: error instanceof Error ? error.message : "worker_error",
      } satisfies WorkerReply),
    );
}
