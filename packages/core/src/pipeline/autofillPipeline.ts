import type {
  AutofillPlan,
  AutofillProfile,
  FieldDescriptor,
  FieldMatcher,
  FillActionType,
  FillTask,
  LoggerPort,
  PlannedField,
} from "../types";
import { FuseFieldMatcher } from "../matching/fuseFieldMatcher";

export interface CreateAutofillPlanOptions {
  matcher?: FieldMatcher;
  logger?: LoggerPort;
  minConfidence?: number;
}

export function createAutofillPlan(
  fields: FieldDescriptor[],
  profile: AutofillProfile,
  options: CreateAutofillPlanOptions = {},
): AutofillPlan {
  const started = performance.now();
  const matcher = options.matcher ?? new FuseFieldMatcher();
  const minConfidence = options.minConfidence ?? 0.62;
  const plannedFields: PlannedField[] = [];
  const skipped: AutofillPlan["skipped"] = [];
  const tasks: FillTask[] = [];

  for (const field of fields) {
    if (field.disabled) {
      skipped.push({ field, reason: "disabled_field" });
      continue;
    }

    if (!field.searchText) {
      skipped.push({ field, reason: "missing_search_text" });
      continue;
    }

    const match = matcher.match(field);
    if (!match || match.confidence < minConfidence) {
      skipped.push({ field, reason: "no_confident_match" });
      continue;
    }

    const value = profile[match.semantic];
    if (value === undefined || value === null || value === "") {
      skipped.push({ field, reason: "profile_value_missing" });
      continue;
    }

    const action = resolveAction(field.type);
    if (!action) {
      skipped.push({ field, reason: "unsupported_field_type" });
      continue;
    }

    const planned: PlannedField = { ...field, match, value };
    plannedFields.push(planned);
    tasks.push({
      id: `task_${tasks.length}_${field.id}`,
      fieldId: field.id,
      selector: field.selector,
      action,
      value,
      semantic: match.semantic,
      confidence: match.confidence,
    });
  }

  options.logger?.info("autofill_plan_created", {
    fields: fields.length,
    tasks: tasks.length,
    skipped: skipped.length,
  });

  return {
    id: crypto.randomUUID(),
    fields,
    plannedFields,
    tasks,
    skipped,
    createdAt: Date.now(),
    elapsedMs: Number((performance.now() - started).toFixed(2)),
  };
}

function resolveAction(type: string): FillActionType | null {
  if (["text", "textarea", "email", "tel", "password", "number", "date"].includes(type)) {
    return "setText";
  }
  if (type === "checkbox") return "setChecked";
  if (type === "radio") return "selectRadio";
  if (type === "select") return "selectOption";
  if (type === "file") return "uploadFile";
  return null;
}
