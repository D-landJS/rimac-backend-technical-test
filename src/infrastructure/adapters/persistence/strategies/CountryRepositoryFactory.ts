import { CountryCode } from '@domain/value-objects/CountryCode';
import { AppointmentCountryRepository } from '@domain/ports/AppointmentCountryRepository';
import { MySQLAppointmentCountryRepository } from '@infrastructure/adapters/persistence/MySQLAppointmentCountryRepository';
import { MySQLConnectionFactory } from '@infrastructure/config/MySQLConnectionFactory';

export const CountryRepositoryFactory = {
  create(country: CountryCode): AppointmentCountryRepository {
    const pool = MySQLConnectionFactory.getPoolForCountry(country);
    return new MySQLAppointmentCountryRepository(pool);
  },
};
