import { Appointment } from '@domain/entities/Appointment';

export interface AppointmentCountryRepository {
  save(appointment: Appointment): Promise<void>;
}
