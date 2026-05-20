import type { AutofillPlan, AutofillProfile, FieldScanResult, RuntimeLog, TaskResult } from "@autofill/core";
import { defaultProfile } from "@autofill/core";
import { create } from "zustand";

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

export const useStudioStore = create<StudioState>((set) => ({
  profile: defaultProfile,
  results: [],
  logs: [],
  setProfile: (profile) => set({ profile }),
  setScan: (scan) => set({ scan }),
  setPlan: (plan) => set({ plan }),
  setResults: (results) => set({ results }),
  pushLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 300) })),
  clearLogs: () => set({ logs: [] }),
}));
