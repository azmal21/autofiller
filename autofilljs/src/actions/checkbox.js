// strategies/toggleCheckbox.js

export async function toggleCheckbox(task) {
  const { element, value } = task;

  const shouldCheck = Boolean(value);

  if (element.checked !== shouldCheck) {
    element.click();
  }
}
