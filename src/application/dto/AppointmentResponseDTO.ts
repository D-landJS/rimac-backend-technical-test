import { Expose, Transform, plainToInstance } from 'class-transformer';
import { Appointment } from '@domain/entities/Appointment';

function toReadableDateTime(peruIsoLike: string): string {
  const [datePart, timePart] = peruIsoLike.split('T');
  const [year, month, day] = datePart.split('-');
  const time = timePart.slice(0, 8);
  return `${day}/${month}/${year}, ${time}`;
}

export class AppointmentResponseDTO {
  @Expose() appointmentId!: string;
  @Expose() insuredId!: string;
  @Expose() scheduleId!: number;
  @Expose() countryISO!: string;
  @Expose() status!: string;

  @Expose()
  @Transform(({ value }) => toReadableDateTime(value))
  createdAt!: string;

  @Expose()
  @Transform(({ value }) => toReadableDateTime(value))
  updatedAt!: string;

  public static fromEntity(appointment: Appointment): AppointmentResponseDTO {
    return plainToInstance(AppointmentResponseDTO, appointment.toPrimitives(), {
      excludeExtraneousValues: true,
    });
  }
}
