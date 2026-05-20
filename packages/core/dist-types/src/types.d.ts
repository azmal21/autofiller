export type FieldType = "text" | "textarea" | "email" | "tel" | "password" | "number" | "select" | "checkbox" | "radio" | "file" | "date" | "unknown";
export type SemanticField = "first_name" | "middle_name" | "last_name" | "full_name" | "email" | "phone" | "linkedin" | "portfolio" | "github" | "resume" | "cover_letter" | "current_company" | "current_role" | "current_salary" | "expected_salary" | "experience" | "skills" | "college" | "degree" | "graduation_year" | "cgpa" | "date_of_birth" | "address" | "city" | "state" | "country" | "pincode" | "role";
export type AutofillProfile = Partial<Record<SemanticField, string | number | boolean | string[]>>;
export interface RuntimeLog {
    id: string;
    level: "debug" | "info" | "warn" | "error";
    source: string;
    message: string;
    data?: unknown;
    createdAt: number;
}
export interface FieldDescriptor {
    id: string;
    selector: string;
    tagName: string;
    type: FieldType;
    name?: string | undefined;
    domId?: string | undefined;
    label?: string | undefined;
    placeholder?: string | undefined;
    ariaLabel?: string | undefined;
    value?: string | undefined;
    required: boolean;
    disabled: boolean;
    visible: boolean;
    searchText: string;
}
export interface FieldScanResult {
    fields: FieldDescriptor[];
    elapsedMs: number;
}
export interface FieldMatch {
    semantic: SemanticField;
    confidence: number;
    strategy: "exact" | "fuzzy" | "heuristic";
    alias: string;
    score: number;
}
export type PlannedField = Omit<FieldDescriptor, "value"> & {
    match: FieldMatch;
    value: string | number | boolean | string[];
};
export type FillActionType = "setText" | "setChecked" | "selectOption" | "selectRadio" | "uploadFile";
export interface FillTask {
    id: string;
    fieldId: string;
    selector: string;
    action: FillActionType;
    value: string | number | boolean | string[];
    semantic: SemanticField;
    confidence: number;
}
export interface AutofillPlan {
    id: string;
    fields: FieldDescriptor[];
    plannedFields: PlannedField[];
    tasks: FillTask[];
    skipped: Array<{
        field: FieldDescriptor;
        reason: string;
    }>;
    createdAt: number;
    elapsedMs: number;
}
export interface TaskResult {
    taskId: string;
    fieldId: string;
    status: "success" | "skipped" | "failed";
    message?: string | undefined;
    elapsedMs: number;
}
export interface LoggerPort {
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
}
export interface FieldMatcher {
    match(field: FieldDescriptor): FieldMatch | null;
    search(query: string, limit?: number): FieldMatch[];
}
//# sourceMappingURL=types.d.ts.map