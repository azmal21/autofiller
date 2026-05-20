export interface QueueTask<T> {
    id: string;
    run(signal: AbortSignal): Promise<T>;
}
export declare class WorkerTaskQueue {
    private readonly concurrency;
    private readonly pending;
    private active;
    constructor(concurrency?: number);
    enqueue<T>(run: (signal: AbortSignal) => Promise<T>): Promise<T>;
    private drain;
}
//# sourceMappingURL=taskQueue.d.ts.map