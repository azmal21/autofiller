import type { FieldDescriptor, FieldMatch, FieldMatcher } from "../types";
export interface FuseFieldMatcherOptions {
    threshold?: number;
    minConfidence?: number;
}
export declare class FuseFieldMatcher implements FieldMatcher {
    private readonly fuse;
    private readonly minConfidence;
    constructor(options?: FuseFieldMatcherOptions);
    match(field: FieldDescriptor): FieldMatch | null;
    search(query: string, limit?: number): FieldMatch[];
    private applyFieldHeuristics;
}
//# sourceMappingURL=fuseFieldMatcher.d.ts.map