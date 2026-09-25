import { withSqsErrorHandling } from '@shared/messaging/withSqsErrorHandling';
import { buildCompleteAppointmentUseCase } from '@infrastructure/config/appointmentCompositionRoot';

const completeAppointmentUseCase = buildCompleteAppointmentUseCase();

interface EventBridgeSqsEnvelope {
  detail: {
    appointmentId: string;
  };
}

export const handler = withSqsErrorHandling(async (record) => {
  const event = JSON.parse(record.body) as EventBridgeSqsEnvelope;
  await completeAppointmentUseCase.execute(event.detail.appointmentId);
});
