export const fileField = {
  createTask(field) {
    return {
      action: "uploadFile",
      fieldId: field.id,
      element: field.element,
      value: field.resolvedValue,
    };
  },
};
