import { describe, expect, it } from "vitest";
import { demoRepository } from "@/data/repositories/demo-repository";
import { calculateExecutiveKpis, calculateKpi } from "@/features/kpis/kpi-service";
import { detectOpportunities } from "@/features/opportunities/opportunity-service";
import { scorePriority } from "@/features/opportunities/priority-service";

const appointments = demoRepository.getAppointments();
const capacity = demoRepository.getCapacity();

describe("cálculos de inteligencia operativa", () => {
  it("calcula los cinco KPIs ejecutivos con datos demostrativos", () => {
    const results = calculateExecutiveKpis(appointments, capacity);
    expect(results).toHaveLength(5);
    expect(results.find((result) => result.code === "cancellations")?.value).toBe(11.25);
    expect(results.find((result) => result.code === "utilization")?.value).toBeCloseTo(73.8, 1);
  });

  it("identifica el aumento de no-shows en consulta especializada", () => {
    const result = calculateKpi("noShows", appointments, capacity, "Consulta especializada");
    expect(result.value).toBe(25);
    expect(result.change).toBe(20);
  });

  it("genera oportunidades ordenadas con factores transparentes", () => {
    const opportunities = detectOpportunities(appointments, capacity);
    expect(opportunities.length).toBeGreaterThanOrEqual(4);
    expect(opportunities[0].priorityScore).toBeGreaterThanOrEqual(opportunities[1].priorityScore);
    expect(opportunities.every((item) => item.priorityFactors.impact >= 0)).toBe(true);
  });

  it("aplica los pesos de prioridad de forma determinista", () => {
    expect(scorePriority({ impact: 100, variation: 100, frequency: 100, capacityAffected: 100 })).toBe(100);
  });
});
