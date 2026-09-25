import { ProcessCountryAppointmentUseCase } from '@application/use-cases/ProcessCountryAppointmentUseCase';
import { AppointmentCountryRepository } from '@domain/ports/AppointmentCountryRepository';
import { AppointmentConfirmationPublisher } from '@domain/ports/AppointmentConfirmationPublisher';
import { AppointmentStatus } from '@domain/value-objects/AppointmentStatus';

function buildCountryRepositoryMock(): jest.Mocked<AppointmentCountryRepository> {
  return { save: jest.fn() };
}

function buildConfirmationPublisherMock(): jest.Mocked<AppointmentConfirmationPublisher> {
  return { publishConfirmation: jest.fn() };
}

describe('ProcessCountryAppointmentUseCase', () => {
  it('guarda la cita en la base del pais y publica la confirmacion a EventBridge', async () => {
    const countryRepository = buildCountryRepositoryMock();
    const confirmationPublisher = buildConfirmationPublisherMock();
    const useCase = new ProcessCountryAppointmentUseCase(countryRepository, confirmationPublisher);

    const now = new Date().toISOString();
    await useCase.execute({
      appointmentId: 'id-1',
      insuredId: '00123',
      scheduleId: 1,
      countryISO: 'PE',
      status: AppointmentStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    });

    expect(countryRepository.save).toHaveBeenCalledTimes(1);
    expect(confirmationPublisher.publishConfirmation).toHaveBeenCalledWith('id-1');
  });
});
