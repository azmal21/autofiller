````md
# Extension Architecture Documentation

This extension is built using a pipeline-driven architecture.

The system is designed to separate:

- orchestration
- field intelligence
- value resolution
- browser actions
- user profile data

This separation keeps the codebase scalable, readable, and easy to extend.

---

# High Level Flow

```text
Extract Fields
    ↓
Normalize Fields
    ↓
Resolve Values
    ↓
Validate Fields
    ↓
Create Tasks
    ↓
Run Tasks
```
````

Each stage has a single responsibility.

---

# Folder Structure

```text
src/
│
├── actions/
├── constants/
├── fields/
├── pipeline/
├── profile/
├── resolvers/
├── utils/
```

---

# Architecture Overview

| Folder    | Responsibility                |
| --------- | ----------------------------- |
| pipeline  | controls execution flow       |
| fields    | field-specific logic          |
| resolvers | value matching and resolution |
| actions   | browser DOM interactions      |
| profile   | user profile data             |
| constants | shared enums/constants        |
| utils     | reusable helpers              |

---

# pipeline/

Pipeline controls the entire execution flow.

It orchestrates stages but does not contain field-specific logic.

```text
pipeline/
  stages/
```

---

## pipeline/stages/

Each file represents one step in the autofill flow.

```text
pipeline/stages/
  extractFields.js
  normalizeFields.js
  resolveValues.js
  validateFields.js
  createTasks.js
  runTasks.js
```

---

## extractFields.js

Responsible for:

- scanning DOM
- extracting raw field metadata
- collecting elements

Example output:

```js
{
  (element, label, placeholder, inputType);
}
```

---

## normalizeFields.js

Converts inconsistent field metadata into standardized structure.

Example:

```text
"Your Email Address"
↓
email
```

---

## resolveValues.js

Responsible for finding the correct value for a field.

Uses:

- profile data
- exact matchers
- fuzzy matchers

Example:

```text
field.semanticType = "email"
↓
profileStore.email
```

---

## validateFields.js

Checks whether resolved values are valid before execution.

Example:

- empty values
- invalid file paths
- malformed emails

---

## createTasks.js

Converts resolved fields into executable task objects.

This stage:

- selects correct field handler
- creates task definitions
- attaches tasks to payload

Example task:

```js
{
  action: ("humanType", element, value);
}
```

---

## runTasks.js

Executes all generated tasks.

Maps:

```text
task.action
↓
actual action implementation
```

Example:

```js
actions[task.action](task);
```

---

# fields/

Contains field-specific intelligence.

```text
fields/
  handlers/
  definitions/
  types/
```

---

# fields/handlers/

Handlers decide how different field types behave.

They do NOT directly manipulate the DOM.

Handlers only generate task definitions.

```text
fields/handlers/
  index.js
  textField.js
  fileField.js
  checkboxField.js
  radioField.js
  selectField.js
```

---

## Example

### textField.js

```js
export const textField = {
  createTask(field) {
    return {
      action: "humanType",
      element: field.element,
      value: field.resolvedValue,
    };
  },
};
```

---

# fields/handlers/index.js

Acts as handler registry.

Maps:

```text
field.type → handler
```

Example:

```js
getHandler(field.type);
```

---

# fields/types/

Contains actual HTML/input field types.

These represent browser behavior types.

```text
text
checkbox
radio
file
select
```

Example:

```js
FIELD_TYPES.TEXT;
```

---

# fields/definitions/

Contains semantic field definitions.

These represent WHAT a field means.

Examples:

```text
email
full_name
resume
linkedin
```

Each definition includes aliases for matching.

Example:

```js
{
  type: "email",
  alias: ["email", "email address"]
}
```

---

# resolvers/

Responsible for value matching and resolution.

```text
resolvers/
  matchers/
```

---

# resolvers/matchers/

Contains matching algorithms.

```text
exactFieldMatcher.js
fuzzyFieldMatcher.js
```

These help determine:

```text
which semantic field matches which DOM field
```

---

# actions/

Contains actual browser interaction logic.

These files directly manipulate the DOM.

```text
actions/
  index.js
  humanType.js
  uploadFile.js
  toggleCheckbox.js
  selectOption.js
```

---

# Actions vs Handlers

| Handlers                  | Actions                     |
| ------------------------- | --------------------------- |
| decide WHAT should happen | perform HOW it happens      |
| generate task definitions | execute browser interaction |
| no DOM execution          | directly touches DOM        |

---

## Example

### Handler output

```js
{
  action: ("humanType", element, value);
}
```

### Action execution

```js
await humanType(task);
```

---

# profile/

Contains user profile data.

```text
profile/
  profileStore.js
```

Example:

```js
export const profileStore = {
  full_name: "Sukesh Acharya",
  email: "example@gmail.com",
};
```

Resolvers use this data to autofill fields.

---

# constants/

Contains reusable enums/constants.

```text
constants/
  index.js
```

Examples:

- FIELD_TYPES
- FIELD_DEFINITIONS
- ACTIONS
- PIPELINE_STAGES
- TASK_STATUS

---

# utils/

Reusable helper functions.

```text
utils/
  delay.js
  normalizeText.js
  logger.js
```

---

# Core Architecture Principles

## 1. Pipeline controls flow

Pipeline stages orchestrate execution.

They should NOT contain browser-specific logic.

---

## 2. Handlers decide behavior

Handlers understand field behavior.

They generate task definitions.

---

## 3. Actions execute browser interaction

Actions directly manipulate DOM elements.

---

## 4. Resolvers find values

Resolvers determine:

```text
what value belongs to what field
```

---

## 5. Profile data stays isolated

User data is stored separately from execution logic.

---

# Example Full Flow

```text
DOM Field
    ↓
extractFields
    ↓
normalizeFields
    ↓
resolveValues
    ↓
createTasks
    ↓
handler.createTask()
    ↓
task object created
    ↓
runTasks
    ↓
action executes
    ↓
DOM updated
```

---

# Why This Architecture Works

This structure provides:

- clear separation of concerns
- scalability
- easier debugging
- easier testing
- extensibility
- maintainability

New field types, actions, or resolvers can be added without modifying the entire system.

---

# Design Philosophy

The architecture separates:

```text
WHAT should happen
vs
HOW it happens
```

Examples:

| Responsibility              | Layer    |
| --------------------------- | -------- |
| determine correct behavior  | handler  |
| determine correct value     | resolver |
| perform browser interaction | action   |
| orchestrate system flow     | pipeline |

```

```
