import type { Appointment, AppointmentStatus } from "@/domain/entities/operational";

export const DEMO_DATA_NOTICE = "DATOS DEMOSTRATIVOS — NO CORRESPONDEN A DATOS REALES DE CLÍNICA DIME";

type ServiceFixture = { service: string; equipment: string | null; revenue: number; previous: AppointmentStatus[]; current: AppointmentStatus[] };

const fixtures: ServiceFixture[] = [
  { service: "Imagen diagnóstica", equipment: "Tomógrafo", revenue: 285000, previous: ["cancelled", "no_show", "rescheduled", ...Array(17).fill("completed")], current: [...Array(5).fill("cancelled"), "no_show", "rescheduled", ...Array(13).fill("completed")] },
  { service: "Consulta especializada", equipment: null, revenue: 180000, previous: ["cancelled", "no_show", ...Array(2).fill("rescheduled"), ...Array(16).fill("completed")], current: [...Array(2).fill("cancelled"), ...Array(5).fill("no_show"), "rescheduled", ...Array(12).fill("completed")] },
  { service: "Rehabilitación", equipment: "Sala terapéutica", revenue: 95000, previous: ["cancelled", "no_show", "rescheduled", ...Array(17).fill("completed")], current: ["cancelled", "no_show", ...Array(2).fill("rescheduled"), ...Array(16).fill("completed")] },
  { service: "Laboratorio", equipment: "Analizador", revenue: 65000, previous: ["cancelled", ...Array(3).fill("rescheduled"), ...Array(16).fill("completed")], current: ["cancelled", ...Array(5).fill("rescheduled"), ...Array(14).fill("completed")] }
];

function makePeriod(service: ServiceFixture, statuses: AppointmentStatus[], month: "07" | "08"): Appointment[] {
  return statuses.map((status, index) => ({
    id: `${month}-${service.service.slice(0, 3).toLowerCase()}-${String(index + 1).padStart(2, "0")}`,
    date: `2026-${month}-${String((index % 20) + 1).padStart(2, "0")}`,
    service: service.service,
    schedule: index % 2 === 0 ? "Mañana" : "Tarde",
    equipment: service.equipment,
    status,
    cancellationReason: status === "cancelled" ? "Motivo no clasificado (demo)" : null,
    revenuePotential: service.revenue
  }));
}

export const demoAppointments: Appointment[] = fixtures.flatMap((fixture) => [
  ...makePeriod(fixture, fixture.previous, "07"),
  ...makePeriod(fixture, fixture.current, "08")
]);
