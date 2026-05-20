export const selectField = {
  createTask(field) {
    return {
      action: "selectOption",
      fieldId: field.id,
      element: field.element,
      value: field.resolvedValue,
    };
  },
};
