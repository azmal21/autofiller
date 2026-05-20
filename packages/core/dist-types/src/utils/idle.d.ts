export declare function runWhenIdle(callback: () => void, timeout?: number): number;
export declare function cancelIdle(handle: number): void;
export declare function debounce<TArgs extends unknown[]>(fn: (...args: TArgs) => void, waitMs: number): (...args: TArgs) => void;
//# sourceMappingURL=idle.d.ts.map