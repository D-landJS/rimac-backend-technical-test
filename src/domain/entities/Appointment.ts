import { InsuredId } from '@domain/value-objects/InsuredId';
import { ScheduleId } from '@domain/value-objects/ScheduleId';
import { CountryISO } from '@domain/value-objects/CountryISO';
import { AppointmentStatus } from '@domain/value-objects/AppointmentStatus';
import { AppointmentPrimitives } from '@domain/types/AppointmentPrimitives';
import { nowInPeru } from '@shared/date/nowInPeru';

export class Appointment {
  private constructor(
    private readonly _appointmentId: string,
    private readonly _insuredId: InsuredId,
    private readonly _scheduleId: ScheduleId,
    private readonly _countryISO: CountryISO,
    private _status: AppointmentStatus,
    private readonly _createdAt: string,
    private _updatedAt: string,
  ) {}

  public static create(params: {
    appointmentId: string;
    insuredId: string;
    scheduleId: number;
    countryISO: string;
  }): Appointment {
    const now = nowInPeru();
    return new Appointment(
      params.appointmentId,
      InsuredId.create(params.insuredId),
      ScheduleId.create(params.scheduleId),
      CountryISO.create(params.countryISO),
      AppointmentStatus.PENDING,
      now,
      now,
    );
  }

  public static fromPrimitives(data: AppointmentPrimitives): Appointment {
    return new Appointment(
      data.appointmentId,
      InsuredId.create(data.insuredId),
      ScheduleId.create(data.scheduleId),
      CountryISO.create(data.countryISO),
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }

  public markAsCompleted(): void {
    this._status = AppointmentStatus.COMPLETED;
    this._updatedAt = nowInPeru();
  }

  public toPrimitives(): AppointmentPrimitives {
    return {
      appointmentId: this._appointmentId,
      insuredId: this._insuredId.value,
      scheduleId: this._scheduleId.value,
      countryISO: this._countryISO.value,
      status: this._status,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  public get appointmentId(): string {
    return this._appointmentId;
  }
}
