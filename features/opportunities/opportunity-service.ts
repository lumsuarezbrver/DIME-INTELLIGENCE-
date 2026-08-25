import type { Appointment, CapacityRecord, Opportunity } from "@/domain/entities/operational";
import { CURRENT_PERIOD, serviceMetrics } from "@/features/kpis/kpi-service";
import { priorityLabel, scorePriority } from "@/features/opportunities/priority-service";

const money = (value: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
const changeText = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)} pp vs. período anterior`;

export function detectOpportunities(appointments: Appointment[], capacity: CapacityRecord[]): Opportunity[] {
  const services = [...new Set(appointments.map((item) => item.service))];
  const opportunities: Opportunity[] = [];
  for (const service of services) {
    const metric = serviceMetrics(appointments, capacity, service);
    const current = appointments.filter((item) => item.date.startsWith("2026-08") && item.service === service);
    const affected = (status: string) => current.filter((item) => item.status === status);
    const make = (id: string, type: Opportunity["type"], title: string, change: number, rows: Appointment[], capacityAffected: number, evidence: string) => {
      const impact = rows.reduce((total, item) => total + item.revenuePotential, 0);
      const factors = { impact: Math.min(100, impact / 25000), variation: Math.min(100, Math.abs(change) * 5), frequency: Math.min(100, rows.length * 16), capacityAffected: Math.min(100, capacityAffected * 1.8) };
      const priorityScore = scorePriority(factors);
      opportunities.push({ id, type, title, service, period: CURRENT_PERIOD.label, changeObserved: changeText(change), estimatedImpact: impact, impactType: "estimated_impact", capacityAffected, priority: priorityLabel(priorityScore), priorityScore, priorityFactors: factors, status: "detected", description: `Se detectó una desviación en ${service}.`, evidence });
    };
    if (metric.cancellations.change >= 8) make(`${service}-cancel`, "cancellations", "Aumento de cancelaciones", metric.cancellations.change, affected("cancelled"), metric.unusedCapacity.value, `${affected("cancelled").length} cancelaciones sobre ${current.length} citas programadas.`);
    if (metric.noShows.change >= 8) make(`${service}-noshow`, "noShows", "Aumento de no-shows", metric.noShows.change, affected("no_show"), metric.unusedCapacity.value, `${affected("no_show").length} no-shows sobre ${current.length} citas programadas.`);
    if (metric.utilization.value < 70) make(`${service}-utilization`, "utilization", "Capacidad con baja utilización", metric.utilization.change, current, metric.unusedCapacity.value, `${metric.utilization.value.toFixed(1)}% de utilización; ${metric.unusedCapacity.value.toFixed(0)} horas sin uso registrado.`);
    if (metric.reschedules.change >= 8) make(`${service}-reschedule`, "reschedules", "Aumento de reprogramaciones", metric.reschedules.change, affected("rescheduled"), metric.unusedCapacity.value, `${affected("rescheduled").length} reprogramaciones sobre ${current.length} citas programadas.`);
  }
  return opportunities.sort((a, b) => b.priorityScore - a.priorityScore);
}

export function formatImpact(opportunity: Opportunity) { return opportunity.estimatedImpact === null ? "Datos insuficientes" : money(opportunity.estimatedImpact); }
