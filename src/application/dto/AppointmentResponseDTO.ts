import { Expose, plainToInstance } from 'class-transformer';
import { Appointment } from '@domain/entities/Appointment';

export class AppointmentResponseDTO {
  @Expose() appointmentId!: string;
  @Expose() insuredId!: string;
  @Expose() scheduleId!: number;
  @Expose() countryISO!: string;
  @Expose() status!: string;
  @Expose() createdAt!: string;
  @Expose() updatedAt!: string;

  public static fromEntity(appointment: Appointment): AppointmentResponseDTO {
    return plainToInstance(AppointmentResponseDTO, appointment.toPrimitives(), {
      excludeExtraneousValues: true,
    });
  }
}
