// normalizeText.js

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "your",
  "enter",
  "input",
  "field",
  "required",
  "optional",
]);

export function normalizeText(text = "") {
  // STEP 1: normalize structure
  const cleaned = text
    // split camelCase
    .replace(/([a-z])([A-Z])/g, "$1 $2")

    // separators -> spaces
    .replace(/[_\-./:$]+/g, " ")

    // lowercase
    .toLowerCase()

    // remove symbols
    .replace(/[^a-z0-9\s]/g, " ")

    // collapse spaces
    .replace(/\s+/g, " ")

    .trim();

  // STEP 2: tokenize
  const tokens = cleaned.split(" ");

  // STEP 3: dedupe + remove stop words
  const uniqueTokens = new Set();

  for (const token of tokens) {
    if (!token) continue;
    if (STOP_WORDS.has(token)) continue;

    uniqueTokens.add(token);
  }

  // STEP 4: rebuild searchable text
  return [...uniqueTokens].join(" ");
}
