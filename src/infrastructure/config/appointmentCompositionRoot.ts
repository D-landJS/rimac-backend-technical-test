import { dynamoDocumentClient } from '@infrastructure/config/dynamoClient';
import { snsClient } from '@infrastructure/config/snsClient';
import { DynamoDBAppointmentRepository } from '@infrastructure/adapters/persistence/DynamoDBAppointmentRepository';
import { SNSEventPublisher } from '@infrastructure/adapters/messaging/SNSEventPublisher';
import { CreateAppointmentUseCase } from '@application/use-cases/CreateAppointmentUseCase';
import { ListAppointmentsByInsuredIdUseCase } from '@application/use-cases/ListAppointmentsByInsuredIdUseCase';
import { CompleteAppointmentUseCase } from '@application/use-cases/CompleteAppointmentUseCase';
import { AppointmentController } from '@infrastructure/adapters/http/controllers/AppointmentController';

function buildAppointmentRepository(): DynamoDBAppointmentRepository {
  return new DynamoDBAppointmentRepository(
    dynamoDocumentClient,
    process.env.APPOINTMENTS_TABLE_NAME as string,
    process.env.APPOINTMENTS_INSURED_ID_INDEX as string,
  );
}

export function buildAppointmentController(): AppointmentController {
  const appointmentRepository = buildAppointmentRepository();
  const eventPublisher = new SNSEventPublisher(snsClient, process.env.APPOINTMENTS_TOPIC_ARN as string);
  const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository, eventPublisher);
  const listAppointmentsUseCase = new ListAppointmentsByInsuredIdUseCase(appointmentRepository);

  return new AppointmentController(createAppointmentUseCase, listAppointmentsUseCase);
}

export function buildCompleteAppointmentUseCase(): CompleteAppointmentUseCase {
  return new CompleteAppointmentUseCase(buildAppointmentRepository());
}
