import { AppError } from '@shared/errors/AppError';
import { AppCode } from '@shared/constants/AppCode';

export class InvalidCountryIsoError extends AppError {
  constructor() {
    super(AppCode.INVALID_COUNTRY_ISO);
  }
}
