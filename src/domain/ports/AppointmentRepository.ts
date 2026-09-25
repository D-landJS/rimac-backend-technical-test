import { Appointment } from '@domain/entities/Appointment';
import { InsuredId } from '@domain/value-objects/InsuredId';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findById(appointmentId: string): Promise<Appointment | null>;
  findByInsuredId(insuredId: InsuredId): Promise<Appointment[]>;
  update(appointment: Appointment): Promise<void>;
}
