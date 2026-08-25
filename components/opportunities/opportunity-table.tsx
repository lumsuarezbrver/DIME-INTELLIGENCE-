import type { Opportunity } from "@/domain/entities/operational";
import { formatImpact } from "@/features/opportunities/opportunity-service";

const labels = { cancellations: "Cancelaciones", noShows: "No-shows", utilization: "Utilización", unusedCapacity: "Capacidad no utilizada", reschedules: "Reprogramaciones" };

export function OpportunityTable({ opportunities, compact = false }: { opportunities: Opportunity[]; compact?: boolean }) {
  const rows = compact ? opportunities.slice(0, 3) : opportunities;
  return <div className="table-wrap"><table><thead><tr><th>Oportunidad</th><th>Servicio</th><th>KPI asociado</th><th>Cambio observado</th><th>Impacto estimado</th><th>Prioridad</th><th>Estado</th></tr></thead>
    <tbody>{rows.map((opportunity) => <tr key={opportunity.id}><td><span className="opportunity-title">{opportunity.title}</span><small>{opportunity.evidence}</small></td><td>{opportunity.service}</td><td>{labels[opportunity.type]}</td><td className="warning-text">{opportunity.changeObserved}</td><td><b>{formatImpact(opportunity)}</b><small>Ingreso potencial afectado*</small></td><td><span className={`priority ${opportunity.priority}`}>{opportunity.priority === "high" ? "Alta" : opportunity.priority === "medium" ? "Media" : "Baja"}</span></td><td><span className="status">Detectada</span></td></tr>)}</tbody>
  </table></div>;
}
