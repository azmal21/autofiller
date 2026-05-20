import type { AutofillPlan, AutofillProfile, FieldScanResult, RuntimeLog, TaskResult } from "@autofill/core";
export interface MessageMap {
    "profile:get": {
        request: undefined;
        response: AutofillProfile;
    };
    "profile:set": {
        request: AutofillProfile;
        response: {
            saved: true;
        };
    };
    "logs:list": {
        request: undefined;
        response: RuntimeLog[];
    };
    "logs:clear": {
        request: undefined;
        response: {
            cleared: true;
        };
    };
    "workflow:scan": {
        request: {
            tabId?: number;
        };
        response: FieldScanResult;
    };
    "workflow:plan": {
        request: {
            tabId?: number;
            profile?: AutofillProfile;
        };
        response: AutofillPlan;
    };
    "workflow:run": {
        request: {
            tabId?: number;
            profile?: AutofillProfile;
            dryRun?: boolean;
        };
        response: {
            plan: AutofillPlan;
            results: TaskResult[];
        };
    };
}
export type MessageType = keyof MessageMap;
export type MessageRequest<T extends MessageType> = MessageMap[T]["request"];
export type MessageResponse<T extends MessageType> = MessageMap[T]["response"];
//# sourceMappingURL=contracts.d.ts.map