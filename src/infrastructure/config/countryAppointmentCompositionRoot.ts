import { CountryCode } from '@domain/value-objects/CountryCode';
import { CountryRepositoryFactory } from '@infrastructure/adapters/persistence/strategies/CountryRepositoryFactory';
import { EventBridgeConfirmationPublisher } from '@infrastructure/adapters/messaging/EventBridgeConfirmationPublisher';
import { eventBridgeClient } from '@infrastructure/config/eventBridgeClient';
import { ProcessCountryAppointmentUseCase } from '@application/use-cases/ProcessCountryAppointmentUseCase';

export function buildProcessCountryAppointmentUseCase(country: CountryCode): ProcessCountryAppointmentUseCase {
  const countryRepository = CountryRepositoryFactory.create(country);
  const confirmationPublisher = new EventBridgeConfirmationPublisher(
    eventBridgeClient,
    process.env.CONFIRMATION_EVENT_BUS_NAME as string,
  );

  return new ProcessCountryAppointmentUseCase(countryRepository, confirmationPublisher);
}
