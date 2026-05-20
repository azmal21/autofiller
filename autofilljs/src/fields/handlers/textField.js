export const textField = {
  createTask(field) {
    return {
      action: "humanType",
      fieldId: field.id,
      element: field.element,
      value: field.resolvedValue,
    };
  },
};
