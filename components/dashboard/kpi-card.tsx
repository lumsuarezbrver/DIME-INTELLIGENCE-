import type { KpiResult } from "@/domain/entities/operational";

export function KpiCard({ kpi }: { kpi: KpiResult }) {
  const value = kpi.unit === "percent" ? `${kpi.value.toFixed(1)}%` : `${Math.round(kpi.value)} h`;
  const change = `${kpi.change >= 0 ? "+" : ""}${kpi.change.toFixed(1)}${kpi.unit === "percent" ? " pp" : " h"}`;
  const isGood = kpi.code === "utilization" ? kpi.change >= 0 : kpi.change <= 0;
  return <article className="kpi-card">
    <div className="card-top"><span>{kpi.label}</span><span className={`priority ${kpi.priority}`}>{kpi.priority === "high" ? "Atención" : kpi.priority === "medium" ? "En observación" : "Estable"}</span></div>
    <strong>{value}</strong>
    <div className={`kpi-change ${isGood ? "good" : "warning"}`}>{isGood ? "↓" : "↑"} {change} <span>vs. período anterior</span></div>
    <p>{kpi.context}</p>
  </article>;
}
