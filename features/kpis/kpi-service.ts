import type { Appointment, CapacityRecord, KpiCode, KpiResult } from "@/domain/entities/operational";

export const CURRENT_PERIOD = { label: "1–24 de agosto de 2026", month: "2026-08" };
export const PREVIOUS_PERIOD = { label: "1–24 de julio de 2026", month: "2026-07" };

const labels: Record<KpiCode, string> = {
  cancellations: "Cancelaciones", noShows: "No-shows", utilization: "Utilización de capacidad",
  unusedCapacity: "Capacidad no utilizada", reschedules: "Reprogramaciones"
};

function appointmentsForMonth(items: Appointment[], month: string, service?: string) {
  return items.filter((item) => item.date.startsWith(month) && (!service || item.service === service));
}
function capacityForMonth(items: CapacityRecord[], month: string, service?: string) {
  return items.filter((item) => item.date.startsWith(month) && (!service || item.service === service));
}
function sum(items: number[]) { return items.reduce((total, value) => total + value, 0); }
function percent(numerator: number, denominator: number) { return denominator === 0 ? 0 : (numerator / denominator) * 100; }
function trendFor(code: KpiCode, change: number): KpiResult["trend"] {
  if (Math.abs(change) < 0.1) return "stable";
  const higherIsNegative = code !== "utilization";
  return higherIsNegative ? (change > 0 ? "up" : "down") : (change > 0 ? "up" : "down");
}

export function calculateKpi(code: KpiCode, appointments: Appointment[], capacity: CapacityRecord[], service?: string): KpiResult {
  const currentAppointments = appointmentsForMonth(appointments, CURRENT_PERIOD.month, service);
  const previousAppointments = appointmentsForMonth(appointments, PREVIOUS_PERIOD.month, service);
  const currentCapacity = capacityForMonth(capacity, CURRENT_PERIOD.month, service);
  const previousCapacity = capacityForMonth(capacity, PREVIOUS_PERIOD.month, service);
  let value = 0; let previousValue = 0; let unit: KpiResult["unit"] = "percent";

  if (code === "cancellations" || code === "noShows" || code === "reschedules") {
    const status = code === "cancellations" ? "cancelled" : code === "noShows" ? "no_show" : "rescheduled";
    value = percent(currentAppointments.filter((item) => item.status === status).length, currentAppointments.length);
    previousValue = percent(previousAppointments.filter((item) => item.status === status).length, previousAppointments.length);
  }
  if (code === "utilization") {
    value = percent(sum(currentCapacity.map((item) => item.usedHours)), sum(currentCapacity.map((item) => item.availableHours)));
    previousValue = percent(sum(previousCapacity.map((item) => item.usedHours)), sum(previousCapacity.map((item) => item.availableHours)));
  }
  if (code === "unusedCapacity") {
    unit = "hours";
    value = sum(currentCapacity.map((item) => item.availableHours - item.usedHours));
    previousValue = sum(previousCapacity.map((item) => item.availableHours - item.usedHours));
  }
  const change = value - previousValue;
  const priority: KpiResult["priority"] = (code === "utilization" && value < 75) || (code !== "utilization" && Math.abs(change) >= 8) ? "high" : Math.abs(change) >= 3 ? "medium" : "low";
  const context = code === "unusedCapacity" ? `${Math.round(value)} horas disponibles sin uso registrado` : `${currentAppointments.length || currentCapacity.length} registros analizados`;
  return { code, label: labels[code], value, unit, previousValue, change, trend: trendFor(code, change), context, priority, dataQuality: "available" };
}

export function calculateExecutiveKpis(appointments: Appointment[], capacity: CapacityRecord[]) {
  return (["cancellations", "noShows", "utilization", "unusedCapacity", "reschedules"] as KpiCode[]).map((code) => calculateKpi(code, appointments, capacity));
}

export function serviceMetrics(appointments: Appointment[], capacity: CapacityRecord[], service: string) {
  return {
    cancellations: calculateKpi("cancellations", appointments, capacity, service),
    noShows: calculateKpi("noShows", appointments, capacity, service),
    utilization: calculateKpi("utilization", appointments, capacity, service),
    unusedCapacity: calculateKpi("unusedCapacity", appointments, capacity, service),
    reschedules: calculateKpi("reschedules", appointments, capacity, service)
  };
}
