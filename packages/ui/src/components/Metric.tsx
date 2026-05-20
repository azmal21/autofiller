interface MetricProps {
  label: string;
  value: string | number;
  tone?: "neutral" | "good" | "warn";
}

export function Metric({ label, value, tone = "neutral" }: MetricProps) {
  const color = tone === "good" ? "text-emerald-700" : tone === "warn" ? "text-amber-700" : "text-ink";
  return (
    <div className="rounded-md border border-line bg-white/60 p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${color}`}>{value}</div>
    </div>
  );
}
