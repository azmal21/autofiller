import { resolveMatch } from "../../matchers/resolveMatch.js";
import { attachStage } from "../helpers/attachStage.js";
// -------------------------------------
// FIELD TYPE RESOLUTION
// -------------------------------------

/**
 * Resolves extracted fields into
 * canonical semantic field types.
 */

export function resolveValues(extractedFields, logger) {
  // Fault tolerance
  if (!extractedFields) {
    logger?.error?.("missing_extracted_fields");
    return [];
  }

  // Convert NodeList / HTMLCollection / iterable
  const fields = Array.from(extractedFields);
  // Validate array
  if (!Array.isArray(fields)) {
    logger?.error?.("invalid_extracted_fields_type");
    return [];
  }
  const resolvedFields = [];
  for (const field of fields) {
    if (!field.normalized.searchText) {
      logger.skip("missing_search_text", field);
      continue;
    }
    const resolution = resolveMatch(field, logger);

    if (!resolution) {
      logger.skip("unresolved_field_type", field);
      continue;
    }

    resolvedFields.push(
      attachStage(field, "resolved", {
        resolvedType: resolution.item.type,
        confidence: resolution.score,
        status: "resolved",
        resolvedTag: field.raw.type.toLowerCase(),
      }),
    );
  }

  return resolvedFields;
}
