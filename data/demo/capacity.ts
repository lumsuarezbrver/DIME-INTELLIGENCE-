import type { CapacityRecord } from "@/domain/entities/operational";

export const demoCapacity: CapacityRecord[] = [
  ["07", "Imagen diagnóstica", "Tomógrafo", 160, 145, 140], ["08", "Imagen diagnóstica", "Tomógrafo", 160, 124, 118],
  ["07", "Consulta especializada", null, 140, 134, 130], ["08", "Consulta especializada", null, 140, 126, 120],
  ["07", "Rehabilitación", "Sala terapéutica", 120, 112, 108], ["08", "Rehabilitación", "Sala terapéutica", 120, 72, 64],
  ["07", "Laboratorio", "Analizador", 110, 106, 104], ["08", "Laboratorio", "Analizador", 110, 92, 89]
].map(([month, service, equipment, availableHours, scheduledHours, usedHours], index) => ({
  id: `capacity-${index + 1}`, date: `2026-${month}-01`, service: service as string, equipment: equipment as string | null,
  availableHours: availableHours as number, scheduledHours: scheduledHours as number, usedHours: usedHours as number
}));
