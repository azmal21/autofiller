import { Logger } from "./core/logger/logger.js";
import { createPipeline } from "./pipeline/createPipeline.js";
const [extractFields, normalizeFields, resolveValues, createTask, runTasks] =
  createPipeline();
const logger = new Logger("RESOLVE");
const jobApplicationForm = document.querySelector("form");
const extractedFields = extractFields(jobApplicationForm);
const normalizedFields = normalizeFields(extractedFields);
const resolvedValues = resolveValues(normalizedFields, logger);
console.log(resolvedValues);
const activeTask = createTask(resolvedValues, logger);
console.log(activeTask);
