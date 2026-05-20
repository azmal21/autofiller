// -------------------------------------
// FORM FIELD EXTRACTION
// -------------------------------------

/**
 * Extracts DOM form fields and converts them
 * into a normalized internal field structure.
 */
export function extractFields(root, config = {}) {
  if (!root) return [];

  let normalizedRoots = [];

  if (root instanceof Element) {
    normalizedRoots = [root];
  } else if (root instanceof NodeList || Array.isArray(root)) {
    normalizedRoots = [...root];
  } else {
    console.warn("Invalid root provided:", root);
    return [];
  }

  const { selectors = ["input", "textarea", "select"] } = config;

  const extractedDomFields = normalizedRoots.flatMap((rootElement) => {
    return [...rootElement.querySelectorAll(selectors.join(","))];
  });
  return extractedDomFields;
}

// -------------------------------------
// LABEL RESOLUTION
// -------------------------------------

/**
 * Resolves associated label text for a form field.
 */
export function findLabel(el) {
  if (el.id) {
    const label = document.querySelector(`label[for="${el.id}"]`);

    if (label) {
      return label.innerText.trim();
    }
  }
  const parentLabel = el.closest("label");

  if (parentLabel) {
    return parentLabel.innerText.trim();
  }

  return null;
}
