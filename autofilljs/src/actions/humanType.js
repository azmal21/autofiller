import { delay } from "../utils/delay.js";
import { nativeInputValueSetter } from "../utils/InputValueSetter.js";

export async function humanType(task, options = {}) {
  const { delayMs = 40, clearFirst = true } = options;
  const element = task.element;
  const text = task.value;

  if (!element) return;

  element.focus();

  await delay(100);

  // clear existing value
  if (clearFirst) {
    nativeInputValueSetter.call(element, "");

    element.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        inputType: "deleteContentBackward",
      }),
    );
  }

  let currentValue = "";

  for (const char of text) {
    currentValue += char;

    nativeInputValueSetter.call(element, currentValue);

    element.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        data: char,
        inputType: "insertText",
      }),
    );

    await delay(delayMs);
  }

  element.dispatchEvent(
    new Event("change", {
      bubbles: true,
    }),
  );

  element.blur();
}
