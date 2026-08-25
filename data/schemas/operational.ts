import { z } from "zod";

export const appointmentSchema = z.object({
  id: z.string(), date: z.string().date(), service: z.string(), schedule: z.string(),
  equipment: z.string().nullable(), status: z.enum(["completed", "cancelled", "no_show", "rescheduled"]),
  cancellationReason: z.string().nullable(), revenuePotential: z.number().nonnegative()
});

export const capacitySchema = z.object({
  id: z.string(), date: z.string().date(), service: z.string(), equipment: z.string().nullable(),
  availableHours: z.number().nonnegative(), scheduledHours: z.number().nonnegative(), usedHours: z.number().nonnegative()
}).refine((record) => record.usedHours <= record.availableHours, "usedHours cannot exceed availableHours");
