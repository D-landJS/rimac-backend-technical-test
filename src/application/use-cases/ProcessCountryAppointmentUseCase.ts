import { Appointment } from '@domain/entities/Appointment';
import { AppointmentPrimitives } from '@domain/types/AppointmentPrimitives';
import { AppointmentCountryRepository } from '@domain/ports/AppointmentCountryRepository';
import { AppointmentConfirmationPublisher } from '@domain/ports/AppointmentConfirmationPublisher';

export class ProcessCountryAppointmentUseCase {
  constructor(
    private readonly countryRepository: AppointmentCountryRepository,
    private readonly confirmationPublisher: AppointmentConfirmationPublisher,
  ) {}

  public async execute(data: AppointmentPrimitives): Promise<void> {
    const appointment = Appointment.fromPrimitives(data);
    await this.countryRepository.save(appointment);
    await this.confirmationPublisher.publishConfirmation(appointment.appointmentId);
  }
}
