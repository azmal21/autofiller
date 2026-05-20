import type { FillTask } from "../types";
export type TaskElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLElement;
export interface DomActionOptions {
    textDelayMs?: number;
    clearFirst?: boolean;
}
export declare const domActions: {
    setText(element: TaskElement, task: FillTask, options?: DomActionOptions): Promise<void>;
    setChecked(element: TaskElement, task: FillTask): Promise<void>;
    selectRadio(element: TaskElement, task: FillTask): Promise<void>;
    selectOption(element: TaskElement, task: FillTask): Promise<void>;
    uploadFile(element: TaskElement, task: FillTask): Promise<void>;
};
//# sourceMappingURL=domActions.d.ts.map