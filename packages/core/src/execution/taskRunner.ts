import { domActions, type DomActionOptions, type TaskElement } from "../actions/domActions";
import type { FillTask, LoggerPort, TaskResult } from "../types";

export type ResolveTaskElement = (task: FillTask) => TaskElement | null;

export interface RunTasksOptions extends DomActionOptions {
  logger?: LoggerPort;
}

export async function runFillTasks(
  tasks: FillTask[],
  resolveElement: ResolveTaskElement,
  options: RunTasksOptions = {},
): Promise<TaskResult[]> {
  const results: TaskResult[] = [];

  for (const task of tasks) {
    const started = performance.now();
    const element = resolveElement(task);

    if (!element) {
      results.push(result(task, "skipped", "element_not_found", started));
      options.logger?.warn("task_element_not_found", task);
      continue;
    }

    try {
      await domActions[task.action](element, task, options);
      results.push(result(task, "success", undefined, started));
    } catch (error) {
      options.logger?.error("task_failed", { task, error });
      results.push(result(task, "failed", error instanceof Error ? error.message : "task_failed", started));
    }
  }

  return results;
}

function result(
  task: FillTask,
  status: TaskResult["status"],
  message: string | undefined,
  started: number,
): TaskResult {
  const base: TaskResult = {
    taskId: task.id,
    fieldId: task.fieldId,
    status,
    elapsedMs: Number((performance.now() - started).toFixed(2)),
  };
  if (message !== undefined) {
    base.message = message;
  }
  return base;
}
