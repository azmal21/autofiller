export interface QueueTask<T> {
  id: string;
  run(signal: AbortSignal): Promise<T>;
}

export class WorkerTaskQueue {
  private readonly pending: Array<QueueTask<unknown>> = [];
  private active = 0;

  constructor(private readonly concurrency = 1) {}

  enqueue<T>(run: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const controller = new AbortController();
    const task: QueueTask<T> = {
      id: crypto.randomUUID(),
      run,
    };

    return new Promise<T>((resolve, reject) => {
      this.pending.push({
        id: task.id,
        run: async () => {
          try {
            resolve(await task.run(controller.signal));
          } catch (error) {
            reject(error);
          }
        },
      });
      this.drain();
    });
  }

  private drain() {
    while (this.active < this.concurrency && this.pending.length) {
      const task = this.pending.shift();
      if (!task) return;

      this.active += 1;
      void task.run(new AbortController().signal).finally(() => {
        this.active -= 1;
        this.drain();
      });
    }
  }
}
