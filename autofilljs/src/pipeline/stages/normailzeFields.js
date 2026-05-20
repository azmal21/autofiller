// -------------------------------------
// FIELD NORMALIZATION
// -------------------------------------

import { normalizeText } from "../../fields/helpers/normalizeText.js";
import { attachStage } from "../helpers/attachStage.js";

/**
 * Converts extracted DOM form fields into
 * a normalized internal field structure.
 */

export function normalizeFields(extractedFields, logger) {
  return extractedFields.map((field) => {
    // Aggregate searchable field metadata
    const rawSearchText = [
      field.name,
      field.id,
      field.placeholder,
      field.getAttribute("aria-label"),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const searchText = normalizeText(rawSearchText);
    let payload = {
      raw: {
        tag: field.tagName.toLowerCase(),

        type: field.type || null,

        name: field.name || null,

        placeholder: field.placeholder || null,

        value: field.value || null,

        element: field,
      },
    };

    return attachStage(payload, "normalized", {
      searchText,
    });
  });
}
