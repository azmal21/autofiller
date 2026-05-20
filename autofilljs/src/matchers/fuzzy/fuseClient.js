import { SEARCHABLE_FIELD_ALIASES } from "../../fields/semantics/index.js";

export const fuse = new Fuse(SEARCHABLE_FIELD_ALIASES, {
  keys: ["alias"],
  threshold: 0.5,
  includeScore: true,
});
