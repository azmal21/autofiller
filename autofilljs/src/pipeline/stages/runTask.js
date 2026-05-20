import { actions } from "../../actions";

export async function runTasks(payload, logger) {
  for (const task of payload.tasks) {
    const action = actions[task.action];

    if (!action) logger.skip("undefined_action", task.action);
    continue;

    await action(task);
  }
}
