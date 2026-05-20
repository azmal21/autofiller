// ---------------------------------------------
// SEMANTIC FIELD DEFINITIONS
// What the field MEANS
// ---------------------------------------------
export const FIELD_DEFINITIONS = {
  FIRST_NAME: "first_name",
  MIDDLE_NAME: "middle_name",
  LAST_NAME: "last_name",
  FULL_NAME: "full_name",

  EMAIL: "email",
  PHONE: "phone",

  LINKEDIN: "linkedin",
  PORTFOLIO: "portfolio",
  GITHUB: "github",

  RESUME: "resume",
  COVER_LETTER: "cover_letter",

  CURRENT_COMPANY: "current_company",
  CURRENT_ROLE: "current_role",

  CURRENT_SALARY: "current_salary",
  EXPECTED_SALARY: "expected_salary",

  EXPERIENCE: "experience",
  SKILLS: "skills",

  COLLEGE: "college",
  DEGREE: "degree",
  GRADUATION_YEAR: "graduation_year",

  CGPA: "cgpa",

  SSLC_MARKS: "sslc_marks",
  SSLC_CGPA: "sslc_cgpa",

  PUC_MARKS: "puc_marks",
  PUC_CGPA: "puc_cgpa",

  DEGREE_MARKS: "degree_marks",
  DEGREE_CGPA: "degree_cgpa",

  DATE_OF_BIRTH: "date_of_birth",

  ADDRESS: "address",
  CITY: "city",
  STATE: "state",
  COUNTRY: "country",
  PINCODE: "pincode",

  ROLE: "role",
};

// ---------------------------------------------
// INPUT / HTML FIELD TYPES
// How the field behaves
// ---------------------------------------------
export const FIELD_TYPES = {
  TEXT: "text",

  TEXTAREA: "textarea",

  EMAIL: "email",

  TEL: "tel",

  PASSWORD: "password",

  NUMBER: "number",

  SELECT: "select",

  CHECKBOX: "checkbox",

  RADIO: "radio",

  FILE: "file",

  DATE: "date",
};

// ---------------------------------------------
// FIELD HANDLERS
// Used by getHandler()
// ---------------------------------------------
export const FIELD_HANDLERS = {
  TEXT: "textField",

  FILE: "fileField",

  CHECKBOX: "checkboxField",

  RADIO: "radioField",

  SELECT: "selectField",
};

// ---------------------------------------------
// ACTION TYPES
// Executed by runTasks()
// ---------------------------------------------
export const ACTIONS = {
  HUMAN_TYPE: "humanType",

  UPLOAD_FILE: "uploadFile",

  TOGGLE_CHECKBOX: "toggleCheckbox",

  SELECT_RADIO: "selectRadio",

  SELECT_OPTION: "selectOption",

  CLICK_ELEMENT: "clickElement",
};

// ---------------------------------------------
// RESOLVER TYPES
// Matching/resolution methods
// ---------------------------------------------
export const RESOLVERS = {
  EXACT: "exact",

  FUZZY: "fuzzy",

  BRUTE_FORCE: "brute_force",
};

// ---------------------------------------------
// PIPELINE STAGES
// Useful for logging/debugging
// ---------------------------------------------
export const PIPELINE_STAGES = {
  EXTRACT_FIELDS: "extractFields",

  NORMALIZE_FIELDS: "normalizeFields",

  RESOLVE_VALUES: "resolveValues",

  VALIDATE_FIELDS: "validateFields",

  CREATE_TASKS: "createTasks",

  RUN_TASKS: "runTasks",
};

// ---------------------------------------------
// TASK STATUS
// ---------------------------------------------
export const TASK_STATUS = {
  PENDING: "pending",

  RUNNING: "running",

  SUCCESS: "success",

  FAILED: "failed",

  SKIPPED: "skipped",
};

// ---------------------------------------------
// LOG EVENT TYPES
// ---------------------------------------------
export const LOG_EVENTS = {
  FIELD_EXTRACTED: "field_extracted",

  FIELD_NORMALIZED: "field_normalized",

  VALUE_RESOLVED: "value_resolved",

  TASK_CREATED: "task_created",

  TASK_EXECUTED: "task_executed",

  TASK_FAILED: "task_failed",

  HANDLER_NOT_FOUND: "handler_not_found",

  ACTION_NOT_FOUND: "action_not_found",

  RESOLUTION_FAILED: "resolution_failed",
};
