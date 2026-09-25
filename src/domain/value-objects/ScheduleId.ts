import { z } from 'zod';
import { InvalidScheduleIdError } from '@domain/errors';
import { parseOrThrow } from '@shared/validation/parseOrThrow';

export const scheduleIdSchema = z.number().int().positive();

export class ScheduleId {
  private constructor(public readonly value: number) {}

  public static create(rawValue: number): ScheduleId {
    return new ScheduleId(parseOrThrow(scheduleIdSchema, rawValue, InvalidScheduleIdError));
  }
}
