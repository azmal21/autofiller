import type { AutofillPlan, AutofillProfile, FieldScanResult, RuntimeLog, TaskResult } from "@autofill/core";
interface StudioState {
    profile: AutofillProfile;
    scan?: FieldScanResult;
    plan?: AutofillPlan;
    results: TaskResult[];
    logs: RuntimeLog[];
    setProfile(profile: AutofillProfile): void;
    setScan(scan: FieldScanResult): void;
    setPlan(plan: AutofillPlan): void;
    setResults(results: TaskResult[]): void;
    pushLog(log: RuntimeLog): void;
    clearLogs(): void;
}
export declare const useStudioStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StudioState>>;
export {};
//# sourceMappingURL=store.d.ts.map