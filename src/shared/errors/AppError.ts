import { AppCode } from '@shared/constants/AppCode';
import { AppMessage } from '@shared/constants/AppMessage';

export abstract class AppError extends Error {
  public readonly code: AppCode;
  public readonly details?: unknown;

  protected constructor(code: AppCode, details?: unknown) {
    super(AppMessage[code]);
    this.code = code;
    this.details = details;
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
