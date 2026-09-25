import { z } from 'zod';
import { InvalidInsuredIdError } from '@domain/errors';
import { parseOrThrow } from '@shared/validation/parseOrThrow';

export const insuredIdSchema = z.string().regex(/^\d{5}$/);

export class InsuredId {
  private constructor(public readonly value: string) {}

  public static create(rawValue: string): InsuredId {
    return new InsuredId(parseOrThrow(insuredIdSchema, rawValue, InvalidInsuredIdError));
  }
}
