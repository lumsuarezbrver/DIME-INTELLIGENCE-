import { demoAppointments } from "@/data/demo/appointments";
import { demoCapacity } from "@/data/demo/capacity";
import { appointmentSchema, capacitySchema } from "@/data/schemas/operational";
import type { Appointment, CapacityRecord } from "@/domain/entities/operational";

export interface OperationalDataRepository {
  getAppointments(): Appointment[];
  getCapacity(): CapacityRecord[];
}

export const demoRepository: OperationalDataRepository = {
  getAppointments: () => demoAppointments.map((item) => appointmentSchema.parse(item)),
  getCapacity: () => demoCapacity.map((item) => capacitySchema.parse(item))
};
