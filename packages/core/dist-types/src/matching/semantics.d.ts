import type { SemanticField } from "../types";
export interface SemanticDefinition {
    semantic: SemanticField;
    aliases: string[];
    weight: number;
    inputHints?: string[];
}
export declare const FIELD_SEMANTICS: SemanticDefinition[];
export declare const SEARCHABLE_ALIASES: {
    semantic: SemanticField;
    alias: string;
    weight: number;
    inputHints: string[];
}[];
//# sourceMappingURL=semantics.d.ts.map