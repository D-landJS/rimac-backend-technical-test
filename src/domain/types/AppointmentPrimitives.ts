import { AppointmentStatus } from '@domain/value-objects/AppointmentStatus';

export interface AppointmentPrimitives {
  appointmentId: string;
  insuredId: string;
  scheduleId: number;
  countryISO: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}
