const WORD_BOUNDARY = /[_\-./()[\]{}:;]+/g;
const EXCESS_SPACE = /\s+/g;

export function normalizeText(input: unknown): string {
  return String(input ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(WORD_BOUNDARY, " ")
    .replace(EXCESS_SPACE, " ")
    .trim()
    .toLowerCase();
}

export function tokenize(input: unknown): string[] {
  const text = normalizeText(input);
  return text ? [...new Set(text.split(" ").filter(Boolean))] : [];
}
