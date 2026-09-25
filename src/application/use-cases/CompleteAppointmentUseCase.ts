import { AppointmentRepository } from '@domain/ports/AppointmentRepository';
import { AppointmentNotFoundError } from '@domain/errors';

export class CompleteAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async execute(appointmentId: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    appointment.markAsCompleted();
    await this.appointmentRepository.update(appointment);
  }
}
