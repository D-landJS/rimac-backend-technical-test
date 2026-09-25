export const AppCode = {
  APPOINTMENT_REQUEST_RECEIVED: 'APT-001',
  APPOINTMENTS_LISTED: 'APT-002',

  MISSING_REQUEST_BODY: 'APT-003',
  INVALID_JSON_BODY: 'APT-004',
  INVALID_REQUEST_SHAPE: 'APT-005',
  MISSING_INSURED_ID_PARAM: 'APT-006',
  INVALID_INSURED_ID: 'APT-007',
  INVALID_SCHEDULE_ID: 'APT-008',
  INVALID_COUNTRY_ISO: 'APT-009',

  APPOINTMENT_NOT_FOUND: 'APT-010',

  INTERNAL_SERVER_ERROR: 'APT-011',
} as const;

export type AppCode = (typeof AppCode)[keyof typeof AppCode];

export const AppCodeName: Record<AppCode, string> = Object.fromEntries(
  Object.entries(AppCode).map(([name, code]) => [code, name]),
) as Record<AppCode, string>;
