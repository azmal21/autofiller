import type { LoggerPort, RuntimeLog } from "../types";
export interface BufferedLogger extends LoggerPort {
    entries: RuntimeLog[];
    clear(): void;
}
export declare function createLogger(source: string, sink?: (entry: RuntimeLog) => void): BufferedLogger;
//# sourceMappingURL=createLogger.d.ts.map