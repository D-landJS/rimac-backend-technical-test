import { AppCode } from '@shared/constants/AppCode';

export const AppMessage: Record<AppCode, string> = {
  [AppCode.APPOINTMENT_REQUEST_RECEIVED]: 'El agendamiento esta en proceso.',
  [AppCode.APPOINTMENTS_LISTED]: 'Listado de agendamientos obtenido correctamente.',

  [AppCode.MISSING_REQUEST_BODY]: 'El cuerpo de la peticion es requerido.',
  [AppCode.INVALID_JSON_BODY]: 'El cuerpo de la peticion no es un JSON valido.',
  [AppCode.INVALID_REQUEST_SHAPE]: 'El cuerpo de la peticion no tiene el formato esperado.',
  [AppCode.MISSING_INSURED_ID_PARAM]: 'Falta el parametro insuredId en la url.',
  [AppCode.INVALID_INSURED_ID]: 'El codigo de asegurado debe tener 5 digitos numericos.',
  [AppCode.INVALID_SCHEDULE_ID]: 'El identificador del espacio (scheduleId) es invalido.',
  [AppCode.INVALID_COUNTRY_ISO]: 'El pais debe ser "PE" o "CL".',

  [AppCode.APPOINTMENT_NOT_FOUND]: 'No se encontraron agendamientos para el asegurado indicado.',

  [AppCode.INTERNAL_SERVER_ERROR]: 'Ocurrio un error interno al procesar la solicitud.',
};
