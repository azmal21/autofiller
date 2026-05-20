import Fuse from "fuse.js";
import type { FieldDescriptor, FieldMatch, FieldMatcher } from "../types";
import { normalizeText, tokenize } from "../utils/normalizeText";
import { SEARCHABLE_ALIASES } from "./semantics";

type SearchRecord = (typeof SEARCHABLE_ALIASES)[number];

export interface FuseFieldMatcherOptions {
  threshold?: number;
  minConfidence?: number;
}

export class FuseFieldMatcher implements FieldMatcher {
  private readonly fuse: Fuse<SearchRecord>;
  private readonly minConfidence: number;

  constructor(options: FuseFieldMatcherOptions = {}) {
    this.minConfidence = options.minConfidence ?? 0.62;
    this.fuse = new Fuse(SEARCHABLE_ALIASES, {
      keys: [
        { name: "alias", weight: 0.88 },
        { name: "semantic", weight: 0.12 },
      ],
      includeScore: true,
      threshold: options.threshold ?? 0.36,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }

  match(field: FieldDescriptor): FieldMatch | null {
    const results = this.search(field.searchText, 6)
      .map((candidate) => this.applyFieldHeuristics(candidate, field))
      .sort((a, b) => b.confidence - a.confidence);

    const best = results[0];
    if (!best || best.confidence < this.minConfidence) {
      return null;
    }

    return best;
  }

  search(query: string, limit = 8): FieldMatch[] {
    const normalized = normalizeText(query);
    if (!normalized) {
      return [];
    }

    const tokens = tokenize(normalized);
    const exact = SEARCHABLE_ALIASES.find(
      (record) => record.alias === normalized || normalized.includes(record.alias),
    );
    if (exact) {
      return [
        {
          semantic: exact.semantic,
          alias: exact.alias,
          confidence: 1,
          score: 0,
          strategy: "exact",
        },
      ];
    }

    const windows = buildQueryWindows(normalized, tokens);
    const bySemantic = new Map<string, FieldMatch>();

    for (const window of windows) {
      for (const result of this.fuse.search(window, { limit })) {
        const rawScore = result.score ?? 1;
        const aliasTokens = tokenize(result.item.alias);
        const overlap = aliasTokens.filter((token) => tokens.includes(token)).length;
        const overlapBoost = aliasTokens.length ? (overlap / aliasTokens.length) * 0.18 : 0;
        const phraseBoost = normalized.includes(result.item.alias) ? 0.18 : 0;
        const weighted = Math.max(
          0,
          Math.min(1, (1 - rawScore) * result.item.weight + overlapBoost + phraseBoost),
        );
        const candidate = {
          semantic: result.item.semantic,
          alias: result.item.alias,
          confidence: Number(weighted.toFixed(3)),
          score: Number(rawScore.toFixed(4)),
          strategy: phraseBoost > 0 ? "exact" : "fuzzy",
        } satisfies FieldMatch;

        const previous = bySemantic.get(candidate.semantic);
        if (!previous || candidate.confidence > previous.confidence) {
          bySemantic.set(candidate.semantic, candidate);
        }
      }
    }

    return Array.from(bySemantic.values())
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, limit);
  }

  private applyFieldHeuristics(match: FieldMatch, field: FieldDescriptor): FieldMatch {
    let confidence = match.confidence;

    if (field.type === "email" && match.semantic === "email") confidence += 0.12;
    if (field.type === "tel" && match.semantic === "phone") confidence += 0.1;
    if (field.type === "file" && match.semantic === "resume") confidence += 0.12;
    if (field.tagName === "textarea" && ["cover_letter", "address"].includes(match.semantic)) {
      confidence += 0.07;
    }
    if (field.type === "select" && match.semantic === "role") confidence += 0.06;

    return {
      ...match,
      confidence: Number(Math.min(1, confidence).toFixed(3)),
      strategy: confidence === match.confidence ? match.strategy : "heuristic",
    };
  }
}

function buildQueryWindows(normalized: string, tokens: string[]): string[] {
  const windows = new Set<string>([normalized]);

  for (const token of tokens) {
    if (token.length > 1) windows.add(token);
  }

  for (let size = 2; size <= Math.min(4, tokens.length); size += 1) {
    for (let start = 0; start <= tokens.length - size; start += 1) {
      windows.add(tokens.slice(start, start + size).join(" "));
    }
  }

  return [...windows];
}
