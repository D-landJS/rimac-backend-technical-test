import { Appointment } from '@domain/entities/Appointment';

export interface AppointmentEventPublisher {
  publish(appointment: Appointment): Promise<void>;
}
