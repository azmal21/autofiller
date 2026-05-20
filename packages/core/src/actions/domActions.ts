import type { FillTask } from "../types";

export type TaskElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLElement;

export interface DomActionOptions {
  textDelayMs?: number;
  clearFirst?: boolean;
}

export const domActions = {
  async setText(element: TaskElement, task: FillTask, options: DomActionOptions = {}) {
    const input = element as HTMLInputElement | HTMLTextAreaElement;
    const value = Array.isArray(task.value) ? task.value.join(", ") : String(task.value);
    const clearFirst = options.clearFirst ?? true;

    input.focus();
    if (clearFirst) {
      setNativeValue(input, "");
      dispatchInput(input, "deleteContentBackward");
    }

    const delay = options.textDelayMs ?? 0;
    if (delay > 0) {
      let buffer = "";
      for (const char of value) {
        buffer += char;
        setNativeValue(input, buffer);
        dispatchInput(input, "insertText", char);
        await sleep(delay);
      }
    } else {
      setNativeValue(input, value);
      dispatchInput(input, "insertText", value);
    }

    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.blur();
  },

  async setChecked(element: TaskElement, task: FillTask) {
    const input = element as HTMLInputElement;
    const shouldCheck = Boolean(task.value);
    if (input.checked !== shouldCheck) {
      input.click();
    }
  },

  async selectRadio(element: TaskElement, task: FillTask) {
    const input = element as HTMLInputElement;
    const shouldSelect =
      String(input.value).toLowerCase() === String(task.value).toLowerCase() || Boolean(task.value);
    if (shouldSelect && !input.checked) {
      input.click();
    }
  },

  async selectOption(element: TaskElement, task: FillTask) {
    const select = element as HTMLSelectElement;
    const wanted = String(task.value).toLowerCase();
    const option = Array.from(select.options).find((candidate) => {
      return (
        candidate.value.toLowerCase() === wanted ||
        candidate.textContent?.trim().toLowerCase() === wanted
      );
    });

    if (option) {
      select.value = option.value;
    } else {
      select.value = String(task.value);
    }

    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
  },

  async uploadFile(element: TaskElement, task: FillTask) {
    const input = element as HTMLInputElement;
    const value = Array.isArray(task.value) ? task.value[0] : task.value;
    if (!value) return;

    const response = await fetch(String(value));
    const blob = await response.blob();
    const file = new File([blob], getFileName(String(value)), {
      type: blob.type || "application/octet-stream",
    });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  },
};

function setNativeValue(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
  descriptor?.set?.call(element, value);
}

function dispatchInput(
  element: HTMLElement,
  inputType: "insertText" | "deleteContentBackward",
  data?: string,
) {
  const init: InputEventInit = {
    bubbles: true,
    inputType,
  };
  if (data !== undefined) {
    init.data = data;
  }

  element.dispatchEvent(
    new InputEvent("input", init),
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
}

function getFileName(path: string) {
  return path.split("/").pop() || "upload";
}
