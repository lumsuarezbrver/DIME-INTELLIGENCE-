export const APPOINTMENT_STATUSES = ["completed", "cancelled", "no_show", "rescheduled"] as const;
export const OPPORTUNITY_STATUSES = ["detected", "in_analysis", "action_defined", "in_execution", "completed", "dismissed"] as const;
export const DATA_QUALITY_STATUSES = ["available", "insufficient", "unavailable"] as const;

export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];
export type OpportunityStatus = (typeof OPPORTUNITY_STATUSES)[number];
export type DataQualityStatus = (typeof DATA_QUALITY_STATUSES)[number];

export interface Appointment {
  id: string;
  date: string;
  service: string;
  schedule: string;
  equipment: string | null;
  status: AppointmentStatus;
  cancellationReason: string | null;
  revenuePotential: number;
}

export interface CapacityRecord {
  id: string;
  date: string;
  service: string;
  equipment: string | null;
  availableHours: number;
  scheduledHours: number;
  usedHours: number;
}

export type KpiCode = "cancellations" | "noShows" | "utilization" | "unusedCapacity" | "reschedules";

export interface KpiResult {
  code: KpiCode;
  label: string;
  value: number;
  unit: "percent" | "hours";
  previousValue: number;
  change: number;
  trend: "up" | "down" | "stable";
  context: string;
  priority: "high" | "medium" | "low";
  dataQuality: DataQualityStatus;
}

export interface PriorityFactors {
  impact: number;
  variation: number;
  frequency: number;
  capacityAffected: number;
}

export interface Opportunity {
  id: string;
  type: KpiCode;
  title: string;
  service: string;
  period: string;
  changeObserved: string;
  estimatedImpact: number | null;
  impactType: "estimated_impact" | "insufficient_data";
  capacityAffected: number;
  priority: "high" | "medium" | "low";
  priorityScore: number;
  priorityFactors: PriorityFactors;
  status: OpportunityStatus;
  description: string;
  evidence: string;
}
