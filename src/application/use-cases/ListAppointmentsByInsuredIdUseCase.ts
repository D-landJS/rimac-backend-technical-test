import { InsuredId } from '@domain/value-objects/InsuredId';
import { AppointmentRepository } from '@domain/ports/AppointmentRepository';
import { AppointmentResponseDTO } from '@application/dto/AppointmentResponseDTO';

export class ListAppointmentsByInsuredIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async execute(insuredIdRaw: string): Promise<AppointmentResponseDTO[]> {
    const insuredId = InsuredId.create(insuredIdRaw);
    const appointments = await this.appointmentRepository.findByInsuredId(insuredId);
    return appointments.map((appointment) => AppointmentResponseDTO.fromEntity(appointment));
  }
}
