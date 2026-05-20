export function runWhenIdle(callback: () => void, timeout = 500): number {
  if ("requestIdleCallback" in globalThis) {
    return globalThis.requestIdleCallback(callback, { timeout });
  }

  return globalThis.setTimeout(callback, Math.min(timeout, 16)) as unknown as number;
}

export function cancelIdle(handle: number): void {
  if ("cancelIdleCallback" in globalThis) {
    globalThis.cancelIdleCallback(handle);
    return;
  }

  globalThis.clearTimeout(handle);
}

export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs: number,
): (...args: TArgs) => void {
  let timer: ReturnType<typeof globalThis.setTimeout> | undefined;

  return (...args) => {
    if (timer) {
      globalThis.clearTimeout(timer);
    }
    timer = globalThis.setTimeout(() => fn(...args), waitMs);
  };
}
