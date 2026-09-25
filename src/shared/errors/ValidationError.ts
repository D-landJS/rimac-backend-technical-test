import { AppError } from '@shared/errors/AppError';
import { AppCode } from '@shared/constants/AppCode';

export interface FieldValidationDetail {
  field: string;
  reason: string;
}

export class ValidationError extends AppError {
  constructor(code: AppCode, details?: FieldValidationDetail[]) {
    super(code, details);
  }
}
