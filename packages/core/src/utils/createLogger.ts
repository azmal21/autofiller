import type { LoggerPort, RuntimeLog } from "../types";

export interface BufferedLogger extends LoggerPort {
  entries: RuntimeLog[];
  clear(): void;
}

export function createLogger(source: string, sink?: (entry: RuntimeLog) => void): BufferedLogger {
  const entries: RuntimeLog[] = [];

  const push = (level: RuntimeLog["level"], message: string, data?: unknown) => {
    const entry: RuntimeLog = {
      id: crypto.randomUUID(),
      level,
      source,
      message,
      data,
      createdAt: Date.now(),
    };
    entries.push(entry);
    sink?.(entry);
  };

  return {
    entries,
    clear: () => {
      entries.length = 0;
    },
    debug: (message, data) => push("debug", message, data),
    info: (message, data) => push("info", message, data),
    warn: (message, data) => push("warn", message, data),
    error: (message, data) => push("error", message, data),
  };
}
