import { CountryISO } from '@domain/value-objects/CountryISO';
import { CountryCode } from '@domain/value-objects/CountryCode';
import { InvalidCountryIsoError } from '@domain/errors';

describe('CountryISO', () => {
  it('acepta "PE"', () => {
    expect(CountryISO.create('PE').value).toBe(CountryCode.PE);
  });

  it('acepta "CL"', () => {
    expect(CountryISO.create('CL').value).toBe(CountryCode.CL);
  });

  it.each(['pe', 'US', '', 'PERU'])('rechaza "%s" por no ser PE ni CL', (invalidValue) => {
    expect(() => CountryISO.create(invalidValue)).toThrow(InvalidCountryIsoError);
  });
});
