import { textField } from "./textField.js";
import { fileField } from "./fileField.js";
import { checkboxField } from "./checkboxField.js";
import { radioField } from "./radioField.js";
import { selectField } from "./selectField.js";

const handlers = {
  text: textField,
  textarea: textField,
  email: textField,
  tel: textField,
  password: textField,

  file: fileField,

  checkbox: checkboxField,

  radio: radioField,

  select: selectField,
};

export function getHandler(type) {
  return handlers[type] || null;
}
