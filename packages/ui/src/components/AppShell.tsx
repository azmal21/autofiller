import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Activity, Bot, Bug, Gauge, Settings, Workflow } from "lucide-react";
import { cn } from "../utils/cn";

export type NavKey = "dashboard" | "activity" | "workflow" | "matches" | "logs" | "settings";

interface AppShellProps {
  active: NavKey;
  onNavigate(key: NavKey): void;
  title: string;
  children: ReactNode;
  rightRail?: ReactNode;
}

const nav = [
  { key: "dashboard", label: "Dashboard", icon: Gauge },
  { key: "activity", label: "Activity", icon: Activity },
  { key: "workflow", label: "Workflow", icon: Workflow },
  { key: "matches", label: "Matches", icon: Bot },
  { key: "logs", label: "Logs", icon: Bug },
  { key: "settings", label: "Settings", icon: Settings },
] satisfies Array<{ key: NavKey; label: string; icon: typeof Gauge }>;

export function AppShell({ active, onNavigate, title, children, rightRail }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#faf8f2,#e9e4da_45%,#d6ddd7)] text-ink">
      <div className="grid min-h-screen grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-r border-black/10 bg-white/45 px-4 py-5 backdrop-blur">
          <div className="mb-7 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm font-bold text-white">
              AF
            </div>
            <div>
              <div className="text-sm font-semibold">Autofill Studio</div>
              <div className="text-xs text-stone-500">MV3 + Web Test</div>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  className={cn(
                    "flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition",
                    active === item.key ? "bg-ink text-white" : "text-stone-700 hover:bg-white/70",
                  )}
                  onClick={() => onNavigate(item.key)}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
        <main className={cn("grid min-w-0", rightRail ? "grid-cols-[minmax(0,1fr)_360px]" : "")}>
          <section className="min-w-0 px-7 py-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
                <p className="text-sm text-stone-600">Shared pipeline, mocked browser, extension parity.</p>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
              {children}
            </motion.div>
          </section>
          {rightRail ? <aside className="border-l border-black/10 bg-white/35 p-5 backdrop-blur">{rightRail}</aside> : null}
        </main>
      </div>
    </div>
  );
}
