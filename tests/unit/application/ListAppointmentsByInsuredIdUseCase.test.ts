import { ListAppointmentsByInsuredIdUseCase } from '@application/use-cases/ListAppointmentsByInsuredIdUseCase';
import { Appointment } from '@domain/entities/Appointment';
import { InvalidInsuredIdError } from '@domain/errors';
import { buildAppointmentRepositoryMock } from '../../mocks/AppointmentRepository.mock';

describe('ListAppointmentsByInsuredIdUseCase', () => {
  it('devuelve el listado mapeado a DTO', async () => {
    const appointment = Appointment.create({
      appointmentId: 'id-1',
      insuredId: '00123',
      scheduleId: 1,
      countryISO: 'PE',
    });
    const repository = buildAppointmentRepositoryMock();
    repository.findByInsuredId.mockResolvedValue([appointment]);

    const useCase = new ListAppointmentsByInsuredIdUseCase(repository);
    const result = await useCase.execute('00123');

    expect(result).toHaveLength(1);
    expect(result[0].appointmentId).toBe('id-1');
    expect(repository.findByInsuredId).toHaveBeenCalledTimes(1);
  });

  it('devuelve lista vacia si el asegurado no tiene agendamientos', async () => {
    const repository = buildAppointmentRepositoryMock();
    repository.findByInsuredId.mockResolvedValue([]);

    const useCase = new ListAppointmentsByInsuredIdUseCase(repository);
    const result = await useCase.execute('00123');

    expect(result).toEqual([]);
  });

  it('propaga el error de validacion sin llamar al repositorio si insuredId es invalido', async () => {
    const repository = buildAppointmentRepositoryMock();
    const useCase = new ListAppointmentsByInsuredIdUseCase(repository);

    await expect(useCase.execute('abc')).rejects.toThrow(InvalidInsuredIdError);
    expect(repository.findByInsuredId).not.toHaveBeenCalled();
  });
});
