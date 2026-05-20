// -------------------------------------
// EXACT MATCH RESOLVER
// -------------------------------------
import { FIELD_SEMANTICS } from "../../fields/semantics/index.js";
export function exactMatcher(field) {
  if (FIELD_SEMANTICS.aliases.includes(field)) {
    return {
      matched: true,

      resolvedType: field,

      confidence: 1,

      strategy: "exact",
    };
  }

  return null;
}
