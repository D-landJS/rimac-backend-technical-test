import { AppError } from '@shared/errors/AppError';
import { AppCode } from '@shared/constants/AppCode';

export class AppointmentNotFoundError extends AppError {
  constructor() {
    super(AppCode.APPOINTMENT_NOT_FOUND);
  }
}
