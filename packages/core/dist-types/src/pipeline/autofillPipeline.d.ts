import type { AutofillPlan, AutofillProfile, FieldDescriptor, FieldMatcher, LoggerPort } from "../types";
export interface CreateAutofillPlanOptions {
    matcher?: FieldMatcher;
    logger?: LoggerPort;
    minConfidence?: number;
}
export declare function createAutofillPlan(fields: FieldDescriptor[], profile: AutofillProfile, options?: CreateAutofillPlanOptions): AutofillPlan;
//# sourceMappingURL=autofillPipeline.d.ts.map