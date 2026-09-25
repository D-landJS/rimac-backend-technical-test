import { AppError } from '@shared/errors/AppError';
import { AppCode } from '@shared/constants/AppCode';

export class InvalidInsuredIdError extends AppError {
  constructor() {
    super(AppCode.INVALID_INSURED_ID);
  }
}
