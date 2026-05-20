import type { RuntimeLog } from "@autofill/core";

const logs: RuntimeLog[] = [];

export const logStore = {
  push(entry: RuntimeLog) {
    logs.unshift(entry);
    logs.splice(300);
  },
  list() {
    return [...logs];
  },
  clear() {
    logs.length = 0;
  },
};
