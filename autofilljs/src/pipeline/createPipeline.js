import { extractFields } from "./stages/extractFields.js";
import { normalizeFields } from "./stages/normailzeFields.js";
import { resolveValues } from "./stages/resolveValues.js";
import { createTask } from "./stages/createTask.js";
// import { runTasks } from "./stages/runTask.js";
export function createPipeline() {
  return [extractFields, normalizeFields, resolveValues, createTask];
}
