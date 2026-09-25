import { AppCode } from '@shared/constants/AppCode';
import { HttpStatus, HttpStatusCode } from '@shared/constants/HttpStatus';

export const httpStatusByAppCode: Record<AppCode, HttpStatusCode> = {
  [AppCode.APPOINTMENT_REQUEST_RECEIVED]: HttpStatus.ACCEPTED,
  [AppCode.APPOINTMENTS_LISTED]: HttpStatus.OK,

  [AppCode.MISSING_REQUEST_BODY]: HttpStatus.BAD_REQUEST,
  [AppCode.INVALID_JSON_BODY]: HttpStatus.BAD_REQUEST,
  [AppCode.INVALID_REQUEST_SHAPE]: HttpStatus.BAD_REQUEST,
  [AppCode.MISSING_INSURED_ID_PARAM]: HttpStatus.BAD_REQUEST,
  [AppCode.INVALID_INSURED_ID]: HttpStatus.BAD_REQUEST,
  [AppCode.INVALID_SCHEDULE_ID]: HttpStatus.BAD_REQUEST,
  [AppCode.INVALID_COUNTRY_ISO]: HttpStatus.BAD_REQUEST,

  [AppCode.APPOINTMENT_NOT_FOUND]: HttpStatus.NOT_FOUND,

  [AppCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
};
