import { randomUUID } from 'crypto';
import { Appointment } from '@domain/entities/Appointment';
import { AppointmentRepository } from '@domain/ports/AppointmentRepository';
import { AppointmentEventPublisher } from '@domain/ports/AppointmentEventPublisher';
import { CreateAppointmentDTO } from '@application/dto/CreateAppointmentDTO';
import { AppointmentResponseDTO } from '@application/dto/AppointmentResponseDTO';

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventPublisher: AppointmentEventPublisher,
  ) {}

  public async execute(input: CreateAppointmentDTO): Promise<AppointmentResponseDTO> {
    const appointment = Appointment.create({
      appointmentId: randomUUID(),
      insuredId: input.insuredId,
      scheduleId: input.scheduleId,
      countryISO: input.countryISO,
    });

    await this.appointmentRepository.save(appointment);
    await this.eventPublisher.publish(appointment);

    return AppointmentResponseDTO.fromEntity(appointment);
  }
}
