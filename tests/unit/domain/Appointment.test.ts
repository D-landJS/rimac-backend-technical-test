import { Appointment } from '@domain/entities/Appointment';
import { AppointmentStatus } from '@domain/value-objects/AppointmentStatus';

const VALID_INPUT = {
  appointmentId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  insuredId: '00123',
  scheduleId: 100,
  countryISO: 'PE',
};

describe('Appointment', () => {
  it('se crea en estado PENDING con timestamps', () => {
    const appointment = Appointment.create(VALID_INPUT);
    const primitives = appointment.toPrimitives();

    expect(primitives.status).toBe(AppointmentStatus.PENDING);
    expect(primitives.appointmentId).toBe(VALID_INPUT.appointmentId);
    expect(primitives.insuredId).toBe(VALID_INPUT.insuredId);
    expect(primitives.scheduleId).toBe(VALID_INPUT.scheduleId);
    expect(primitives.countryISO).toBe(VALID_INPUT.countryISO);
    expect(primitives.createdAt).toBe(primitives.updatedAt);
  });

  it('markAsCompleted cambia el estado a COMPLETED y actualiza updatedAt', () => {
    const appointment = Appointment.create(VALID_INPUT);
    const { updatedAt: originalUpdatedAt } = appointment.toPrimitives();

    appointment.markAsCompleted();
    const primitives = appointment.toPrimitives();

    expect(primitives.status).toBe(AppointmentStatus.COMPLETED);
    expect(primitives.updatedAt >= originalUpdatedAt).toBe(true);
  });

  it('fromPrimitives reconstruye una entidad ya persistida', () => {
    const original = Appointment.create(VALID_INPUT).toPrimitives();
    const reconstructed = Appointment.fromPrimitives(original);

    expect(reconstructed.toPrimitives()).toEqual(original);
  });
});
