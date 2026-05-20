import { attachStage } from "../helpers/attachStage.js";
import { PROFILE_STORE } from "../../profile/profileStore.js";
import { getHandler } from "../../fields/handlers/index.js";
export function createTask(resolvedFormFields, logger) {
  return resolvedFormFields
    .map((field) => {
      if (field.resolved.status !== "resolved") {
        logger.skip("field_not_resolved", {
          fieldId: field.id,
          fieldName: field.tag,
          status: field.resolved.status,
        });

        return null;
      }

      const fieldType = field.resolved.resolvedType;

      const value = PROFILE_STORE[fieldType];

      if (value == null) {
        logger.warn("profile_value_missing", {
          fieldId: field.id,
          fieldType,
        });

        return null;
      }

      const strategy = getHandler(field.resolved.resolvedTag);

      if (!strategy) {
        logger.error("strategy_resolution_failed", {
          fieldId: field.id,
          fieldType,
        });

        return null;
      }

      return attachStage(field, "strategy", {
        strategy,
        value,
      });
    })
    .filter(Boolean);
}

//strategy chang ethe name later
