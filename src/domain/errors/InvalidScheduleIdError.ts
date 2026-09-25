import { AppError } from '@shared/errors/AppError';
import { AppCode } from '@shared/constants/AppCode';

export class InvalidScheduleIdError extends AppError {
  constructor() {
    super(AppCode.INVALID_SCHEDULE_ID);
  }
}
