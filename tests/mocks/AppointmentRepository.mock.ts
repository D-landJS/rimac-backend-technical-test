import { AppointmentRepository } from '@domain/ports/AppointmentRepository';

export function buildAppointmentRepositoryMock(): jest.Mocked<AppointmentRepository> {
  return { save: jest.fn(), update: jest.fn(), findById: jest.fn(), findByInsuredId: jest.fn() };
}
