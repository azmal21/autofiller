import type { FieldDescriptor, FieldScanResult, FieldType } from "../types";
import { normalizeText } from "../utils/normalizeText";

export interface FieldScannerOptions {
  selectors?: string[];
  includeHidden?: boolean;
}

const DEFAULT_SELECTORS = [
  "input:not([type='hidden'])",
  "textarea",
  "select",
  "[contenteditable='true']",
];

export interface FieldHandle {
  descriptor: FieldDescriptor;
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLElement;
}

export interface FieldHandleScanResult extends FieldScanResult {
  handles: FieldHandle[];
}

export function scanFieldHandles(
  root: ParentNode = document,
  options: FieldScannerOptions = {},
): FieldHandleScanResult {
  const started = performance.now();
  const selectors = options.selectors ?? DEFAULT_SELECTORS;
  const elements = Array.from(root.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (element) => options.includeHidden || isVisible(element),
  );

  const handles = elements.map((element, index) => {
    const descriptor = describeElement(element, index);
    return { descriptor, element };
  });

  return {
    handles,
    fields: handles.map((handle) => handle.descriptor),
    elapsedMs: Number((performance.now() - started).toFixed(2)),
  };
}

export function scanFields(root: ParentNode = document, options?: FieldScannerOptions): FieldScanResult {
  const { fields, elapsedMs } = scanFieldHandles(root, options);
  return { fields, elapsedMs };
}

function describeElement(element: HTMLElement, index: number): FieldDescriptor {
  const input = element as HTMLInputElement;
  const tagName = element.tagName.toLowerCase();
  const label = findLabelText(element);
  const type = getFieldType(element);
  const id = `field_${index}_${hash([
    input.name,
    input.id,
    input.placeholder,
    label,
    tagName,
    type,
  ].join("|"))}`;
  const selector = buildStableSelector(element, index);
  const ariaLabel = element.getAttribute("aria-label") ?? undefined;
  const placeholder = "placeholder" in input ? input.placeholder || undefined : undefined;
  const value = "value" in input ? String(input.value ?? "") : undefined;
  const name = "name" in input ? input.name || undefined : undefined;
  const domId = input.id || undefined;

  const searchText = normalizeText(
    [
      label,
      name,
      domId,
      placeholder,
      ariaLabel,
      element.getAttribute("data-testid"),
      element.getAttribute("autocomplete"),
    ]
      .filter(Boolean)
      .join(" "),
  );

  return {
    id,
    selector,
    tagName,
    type,
    name,
    domId,
    label,
    placeholder,
    ariaLabel,
    value,
    required: Boolean(input.required),
    disabled: Boolean(input.disabled),
    visible: isVisible(element),
    searchText,
  };
}

function getFieldType(element: HTMLElement): FieldType {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "textarea") return "textarea";
  if (tagName === "select") return "select";
  if (element.getAttribute("contenteditable") === "true") return "text";

  if (tagName === "input") {
    const type = ((element as HTMLInputElement).type || "text").toLowerCase();
    if (
      [
        "text",
        "email",
        "tel",
        "password",
        "number",
        "checkbox",
        "radio",
        "file",
        "date",
      ].includes(type)
    ) {
      return type as FieldType;
    }
  }

  return "unknown";
}

function findLabelText(element: HTMLElement): string | undefined {
  const id = element.getAttribute("id");
  if (id) {
    const label = element.ownerDocument.querySelector<HTMLLabelElement>(
      `label[for="${CSS.escape(id)}"]`,
    );
    if (label?.innerText.trim()) return normalizeText(label.innerText);
  }

  const parentLabel = element.closest("label");
  if (parentLabel?.textContent?.trim()) return normalizeText(parentLabel.textContent);

  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((labelId) => element.ownerDocument.getElementById(labelId)?.textContent)
      .filter(Boolean)
      .join(" ");
    if (text.trim()) return normalizeText(text);
  }

  return undefined;
}

function buildStableSelector(element: HTMLElement, index: number): string {
  if (element.id) {
    return `#${CSS.escape(element.id)}`;
  }

  const input = element as HTMLInputElement;
  if (input.name) {
    return `${element.tagName.toLowerCase()}[name="${CSS.escape(input.name)}"]`;
  }

  return `${element.tagName.toLowerCase()}:nth-of-type(${index + 1})`;
}

function isVisible(element: HTMLElement): boolean {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  if (!style || style.display === "none" || style.visibility === "hidden") {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function hash(input: string): string {
  let value = 0;
  for (let i = 0; i < input.length; i += 1) {
    value = (value << 5) - value + input.charCodeAt(i);
    value |= 0;
  }
  return Math.abs(value).toString(36);
}
