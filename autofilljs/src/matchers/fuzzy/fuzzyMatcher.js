import { fuse } from "./fuseClient.js";

export function fuzzyMatcher(field, logger) {
  const searchText = field.normalized.searchText;
  if (!searchText) return null;
  const results = fuse.search(searchText);
  if (!results.length) {
    return null;
  }

  return results[0];
}
