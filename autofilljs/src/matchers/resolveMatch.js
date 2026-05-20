import { exactMatcher } from "./exact/exactMatcher.js";
import { fuzzyMatcher } from "./fuzzy/fuzzyMatcher.js";

export function resolveMatch(field, logger) {
  const result = fuzzyMatcher(field, logger);
  return result;
}
