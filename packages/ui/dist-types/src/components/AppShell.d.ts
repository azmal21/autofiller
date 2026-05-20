import type { ReactNode } from "react";
export type NavKey = "dashboard" | "activity" | "workflow" | "matches" | "logs" | "settings";
interface AppShellProps {
    active: NavKey;
    onNavigate(key: NavKey): void;
    title: string;
    children: ReactNode;
    rightRail?: ReactNode;
}
export declare function AppShell({ active, onNavigate, title, children, rightRail }: AppShellProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AppShell.d.ts.map