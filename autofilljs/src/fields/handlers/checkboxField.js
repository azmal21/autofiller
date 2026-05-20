export const checkboxField = {
  createTask(field) {
    return {
      action: "toggleCheckbox",
      fieldId: field.id,
      element: field.element,
      value: field.resolvedValue,
    };
  },
};
