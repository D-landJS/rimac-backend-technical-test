import { Pool } from 'mysql2/promise';
import { AppointmentCountryRepository } from '@domain/ports/AppointmentCountryRepository';
import { Appointment } from '@domain/entities/Appointment';

export class MySQLAppointmentCountryRepository implements AppointmentCountryRepository {
  constructor(private readonly pool: Pool) {}

  public async save(appointment: Appointment): Promise<void> {
    const p = appointment.toPrimitives();
    await this.pool.execute(
      `INSERT INTO appointments
        (appointment_id, insured_id, schedule_id, country_iso, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        p.appointmentId,
        p.insuredId,
        p.scheduleId,
        p.countryISO,
        new Date(p.createdAt),
        new Date(p.updatedAt),
      ],
    );
  }
}
