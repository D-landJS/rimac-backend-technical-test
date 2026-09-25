import { withHttpErrorHandling } from '@shared/http/withHttpErrorHandling';
import { buildAppointmentController } from '@infrastructure/config/appointmentCompositionRoot';

const controller = buildAppointmentController();

export const handler = withHttpErrorHandling((event) => controller.list(event));
