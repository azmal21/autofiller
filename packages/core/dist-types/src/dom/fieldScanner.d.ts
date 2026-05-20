import type { FieldDescriptor, FieldScanResult } from "../types";
export interface FieldScannerOptions {
    selectors?: string[];
    includeHidden?: boolean;
}
export interface FieldHandle {
    descriptor: FieldDescriptor;
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLElement;
}
export interface FieldHandleScanResult extends FieldScanResult {
    handles: FieldHandle[];
}
export declare function scanFieldHandles(root?: ParentNode, options?: FieldScannerOptions): FieldHandleScanResult;
export declare function scanFields(root?: ParentNode, options?: FieldScannerOptions): FieldScanResult;
//# sourceMappingURL=fieldScanner.d.ts.map