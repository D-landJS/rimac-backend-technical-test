import { withSqsErrorHandling } from '@shared/messaging/withSqsErrorHandling';
import { buildProcessCountryAppointmentUseCase } from '@infrastructure/config/countryAppointmentCompositionRoot';
import { CountryCode } from '@domain/value-objects/CountryCode';
import { AppointmentPrimitives } from '@domain/types/AppointmentPrimitives';

const processAppointmentUseCase = buildProcessCountryAppointmentUseCase(CountryCode.PE);

export const handler = withSqsErrorHandling(async (record) => {
  const data = JSON.parse(record.body) as AppointmentPrimitives;
  await processAppointmentUseCase.execute(data);
});
