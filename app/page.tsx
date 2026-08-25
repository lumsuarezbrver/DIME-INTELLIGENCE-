import Link from "next/link";
import { AppShell } from "@/components/shared/app-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OpportunityTable } from "@/components/opportunities/opportunity-table";
import { demoRepository } from "@/data/repositories/demo-repository";
import { calculateExecutiveKpis, CURRENT_PERIOD } from "@/features/kpis/kpi-service";
import { detectOpportunities } from "@/features/opportunities/opportunity-service";

export default function ExecutiveSummaryPage() {
  const appointments = demoRepository.getAppointments(); const capacity = demoRepository.getCapacity();
  const kpis = calculateExecutiveKpis(appointments, capacity); const opportunities = detectOpportunities(appointments, capacity);
  const top = opportunities[0];
  return <AppShell active="/"><header className="page-header"><div><p className="eyebrow">Resumen ejecutivo</p><h1>Información para decidir con oportunidad</h1><p className="muted">Período analizado: {CURRENT_PERIOD.label}</p></div><div className="update"><span>Última actualización</span><b>25 ago. 2026 · 08:30</b></div></header>
    <section className="health-bar"><span className="health-icon">!</span><div><b>Estado general: requiere atención focalizada</b><p>Se identificaron {opportunities.length} oportunidades priorizadas. La principal señal está asociada a {top?.service.toLowerCase()}.</p></div><Link href="/radar" className="text-link">Ver radar →</Link></section>
    <section><div className="section-heading"><div><p className="eyebrow">Señales operativas</p><h2>KPIs principales</h2></div><p className="muted">Comparación con 1–24 de julio de 2026</p></div><div className="kpi-grid">{kpis.map((kpi) => <KpiCard key={kpi.code} kpi={kpi} />)}</div></section>
    <section className="top-opportunity"><div className="section-heading"><div><p className="eyebrow">Prioridad 01</p><h2>Principal oportunidad a evaluar</h2></div><Link href="/radar" className="text-link">Ver todas →</Link></div>
      {top && <div className="opportunity-highlight"><div><span className="priority high">Alta prioridad</span><h3>{top.title} en {top.service}</h3><p>{top.evidence}</p><p className="cautious">Posible lectura: esta desviación podría estar afectando el uso de la capacidad. Requiere investigación antes de atribuir una causa.</p></div><div className="impact-box"><span>Impacto económico estimado</span><b>{new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(top.estimatedImpact ?? 0)}</b><small>Ingreso potencial afectado*</small></div></div>}
    </section>
    <section><div className="section-heading"><div><p className="eyebrow">Radar</p><h2>Oportunidades detectadas</h2></div></div><OpportunityTable opportunities={opportunities} compact /><p className="footnote">* Estimación basada en el valor potencial de las citas afectadas. No representa una pérdida económica demostrada.</p></section>
  </AppShell>;
}
