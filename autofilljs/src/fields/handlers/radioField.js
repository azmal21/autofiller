export const radioField = {
  createTask(field) {
    return {
      action: "selectRadio",
      fieldId: field.id,
      element: field.element,
      value: field.resolvedValue,
    };
  },
};
