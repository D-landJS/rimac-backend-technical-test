import { z } from 'zod';
import { InvalidCountryIsoError } from '@domain/errors';
import { CountryCode } from '@domain/value-objects/CountryCode';
import { parseOrThrow } from '@shared/validation/parseOrThrow';

export const countryIsoSchema = z.nativeEnum(CountryCode);

export class CountryISO {
  private constructor(public readonly value: CountryCode) {}

  public static create(rawValue: string): CountryISO {
    return new CountryISO(parseOrThrow(countryIsoSchema, rawValue, InvalidCountryIsoError));
  }
}
