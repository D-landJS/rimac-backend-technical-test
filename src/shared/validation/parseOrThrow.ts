import { ZodType } from 'zod';
import { AppError } from '@shared/errors/AppError';

export function parseOrThrow<T>(schema: ZodType<T>, rawValue: unknown, ErrorClass: new () => AppError): T {
  const result = schema.safeParse(rawValue);
  if (!result.success) {
    throw new ErrorClass();
  }
  return result.data;
}
