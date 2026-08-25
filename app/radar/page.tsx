import { AppShell } from "@/components/shared/app-shell";
import { OpportunityTable } from "@/components/opportunities/opportunity-table";
import { demoRepository } from "@/data/repositories/demo-repository";
import { CURRENT_PERIOD } from "@/features/kpis/kpi-service";
import { PRIORITY_WEIGHTS } from "@/features/opportunities/priority-service";
import { detectOpportunities } from "@/features/opportunities/opportunity-service";

export default function OpportunitiesRadarPage() {
  const opportunities = detectOpportunities(demoRepository.getAppointments(), demoRepository.getCapacity());
  return <AppShell active="/radar"><header className="page-header"><div><p className="eyebrow">Radar de oportunidades</p><h1>Desviaciones ordenadas para evaluar</h1><p className="muted">Período analizado: {CURRENT_PERIOD.label}</p></div></header>
    <section className="radar-summary"><div><span className="summary-number">{opportunities.length}</span><span>oportunidades detectadas</span></div><p>Las señales se ordenan con una regla visible. La prioridad orienta la revisión; no confirma causas ni pérdidas económicas.</p></section>
    <section><div className="section-heading"><div><p className="eyebrow">Priorizadas</p><h2>Oportunidades activas</h2></div><span className="status">Ordenadas por prioridad</span></div><OpportunityTable opportunities={opportunities} /><p className="footnote">El impacto mostrado es una estimación de ingreso potencial afectado basada en los datos demo. No equivale a dinero perdido.</p></section>
    <section className="method-card"><div><p className="eyebrow">Metodología</p><h2>¿Cómo se determina la prioridad?</h2><p>La puntuación combina cuatro factores configurables. Esta es una regla de trabajo del prototipo, no una afirmación de causalidad.</p></div><div className="weights"><div><b>{Math.round(PRIORITY_WEIGHTS.impact * 100)}%</b><span>Impacto estimado</span></div><div><b>{Math.round(PRIORITY_WEIGHTS.variation * 100)}%</b><span>Variación</span></div><div><b>{Math.round(PRIORITY_WEIGHTS.frequency * 100)}%</b><span>Frecuencia</span></div><div><b>{Math.round(PRIORITY_WEIGHTS.capacityAffected * 100)}%</b><span>Capacidad afectada</span></div></div></section>
  </AppShell>;
}
