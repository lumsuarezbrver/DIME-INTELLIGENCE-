import type { PriorityFactors } from "@/domain/entities/operational";

export const PRIORITY_WEIGHTS = { impact: 0.4, variation: 0.25, frequency: 0.2, capacityAffected: 0.15 } as const;

export function scorePriority(factors: PriorityFactors) {
  return Math.round(Object.entries(PRIORITY_WEIGHTS).reduce((score, [key, weight]) => score + factors[key as keyof PriorityFactors] * weight, 0));
}

export function priorityLabel(score: number): "high" | "medium" | "low" {
  if (score >= 65) return "high";
  if (score >= 35) return "medium";
  return "low";
}
