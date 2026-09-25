import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { AppointmentConfirmationPublisher } from '@domain/ports/AppointmentConfirmationPublisher';

const SOURCE = 'appointment.country';
const DETAIL_TYPE = 'AppointmentConfirmed';

export class EventBridgeConfirmationPublisher implements AppointmentConfirmationPublisher {
  constructor(
    private readonly client: EventBridgeClient,
    private readonly eventBusName: string,
  ) {}

  public async publishConfirmation(appointmentId: string): Promise<void> {
    await this.client.send(
      new PutEventsCommand({
        Entries: [
          {
            EventBusName: this.eventBusName,
            Source: SOURCE,
            DetailType: DETAIL_TYPE,
            Detail: JSON.stringify({ appointmentId }),
          },
        ],
      }),
    );
  }
}
