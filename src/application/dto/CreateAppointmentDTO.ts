import { z } from 'zod';
import { insuredIdSchema } from '@domain/value-objects/InsuredId';
import { scheduleIdSchema } from '@domain/value-objects/ScheduleId';
import { countryIsoSchema } from '@domain/value-objects/CountryISO';

export const createAppointmentSchema = z.object({
  insuredId: insuredIdSchema,
  scheduleId: scheduleIdSchema,
  countryISO: countryIsoSchema,
});

export type CreateAppointmentDTO = z.infer<typeof createAppointmentSchema>;
