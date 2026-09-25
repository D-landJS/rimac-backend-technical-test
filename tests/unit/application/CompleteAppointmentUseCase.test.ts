import { CompleteAppointmentUseCase } from '@application/use-cases/CompleteAppointmentUseCase';
import { Appointment } from '@domain/entities/Appointment';
import { AppointmentStatus } from '@domain/value-objects/AppointmentStatus';
import { AppointmentNotFoundError } from '@domain/errors';
import { buildAppointmentRepositoryMock } from '../../mocks/AppointmentRepository.mock';

describe('CompleteAppointmentUseCase', () => {
  it('marca la cita como COMPLETED y persiste el cambio', async () => {
    const appointment = Appointment.create({
      appointmentId: 'id-1',
      insuredId: '00123',
      scheduleId: 1,
      countryISO: 'PE',
    });
    const repository = buildAppointmentRepositoryMock();
    repository.findById.mockResolvedValue(appointment);

    const useCase = new CompleteAppointmentUseCase(repository);
    await useCase.execute('id-1');

    expect(repository.update).toHaveBeenCalledTimes(1);
    const updatedAppointment = repository.update.mock.calls[0][0] as Appointment;
    expect(updatedAppointment.toPrimitives().status).toBe(AppointmentStatus.COMPLETED);
  });

  it('lanza AppointmentNotFoundError si el appointmentId no existe', async () => {
    const repository = buildAppointmentRepositoryMock();
    repository.findById.mockResolvedValue(null);

    const useCase = new CompleteAppointmentUseCase(repository);

    await expect(useCase.execute('no-existe')).rejects.toThrow(AppointmentNotFoundError);
    expect(repository.update).not.toHaveBeenCalled();
  });
});
