import { type DomActionOptions, type TaskElement } from "../actions/domActions";
import type { FillTask, LoggerPort, TaskResult } from "../types";
export type ResolveTaskElement = (task: FillTask) => TaskElement | null;
export interface RunTasksOptions extends DomActionOptions {
    logger?: LoggerPort;
}
export declare function runFillTasks(tasks: FillTask[], resolveElement: ResolveTaskElement, options?: RunTasksOptions): Promise<TaskResult[]>;
//# sourceMappingURL=taskRunner.d.ts.map