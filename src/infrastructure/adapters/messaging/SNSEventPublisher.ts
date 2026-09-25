import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { AppointmentEventPublisher } from '@domain/ports/AppointmentEventPublisher';
import { Appointment } from '@domain/entities/Appointment';

export class SNSEventPublisher implements AppointmentEventPublisher {
  constructor(
    private readonly client: SNSClient,
    private readonly topicArn: string,
  ) {}

  public async publish(appointment: Appointment): Promise<void> {
    const primitives = appointment.toPrimitives();
    await this.client.send(
      new PublishCommand({
        TopicArn: this.topicArn,
        Message: JSON.stringify(primitives),
        MessageAttributes: {
          countryISO: { DataType: 'String', StringValue: primitives.countryISO },
        },
      }),
    );
  }
}
