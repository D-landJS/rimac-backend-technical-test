import { CreateAppointmentUseCase } from '@application/use-cases/CreateAppointmentUseCase';
import { AppointmentEventPublisher } from '@domain/ports/AppointmentEventPublisher';
import { AppointmentStatus } from '@domain/value-objects/AppointmentStatus';
import { CountryCode } from '@domain/value-objects/CountryCode';
import { InvalidCountryIsoError } from '@domain/errors';
import { buildAppointmentRepositoryMock } from '../../mocks/AppointmentRepository.mock';

function buildPublisherMock(): jest.Mocked<AppointmentEventPublisher> {
  return { publish: jest.fn() };
}

describe('CreateAppointmentUseCase', () => {
  it('guarda la solicitud en PENDING y publica el evento a SNS', async () => {
    const repository = buildAppointmentRepositoryMock();
    const publisher = buildPublisherMock();
    const useCase = new CreateAppointmentUseCase(repository, publisher);

    const result = await useCase.execute({ insuredId: '00123', scheduleId: 100, countryISO: CountryCode.PE });

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(publisher.publish).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(AppointmentStatus.PENDING);
    expect(result.insuredId).toBe('00123');
    expect(result.appointmentId).toEqual(expect.any(String));
  });

  it('no guarda ni publica si countryISO es invalido', async () => {
    const repository = buildAppointmentRepositoryMock();
    const publisher = buildPublisherMock();
    const useCase = new CreateAppointmentUseCase(repository, publisher);

    await expect(
      useCase.execute({ insuredId: '00123', scheduleId: 100, countryISO: 'US' as unknown as CountryCode }),
    ).rejects.toThrow(InvalidCountryIsoError);

    expect(repository.save).not.toHaveBeenCalled();
    expect(publisher.publish).not.toHaveBeenCalled();
  });
});
