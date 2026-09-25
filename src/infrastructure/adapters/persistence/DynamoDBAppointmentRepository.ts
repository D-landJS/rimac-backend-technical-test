import { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { AppointmentRepository } from '@domain/ports/AppointmentRepository';
import { Appointment } from '@domain/entities/Appointment';
import { AppointmentPrimitives } from '@domain/types/AppointmentPrimitives';
import { InsuredId } from '@domain/value-objects/InsuredId';

export class DynamoDBAppointmentRepository implements AppointmentRepository {
  constructor(
    private readonly client: DynamoDBDocumentClient,
    private readonly tableName: string,
    private readonly insuredIdIndexName: string,
  ) {}

  public async save(appointment: Appointment): Promise<void> {
    await this.client.send(
      new PutCommand({ TableName: this.tableName, Item: appointment.toPrimitives() }),
    );
  }

  public async update(appointment: Appointment): Promise<void> {
    const { appointmentId, status, updatedAt } = appointment.toPrimitives();
    await this.client.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { appointmentId },
        UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':status': status, ':updatedAt': updatedAt },
      }),
    );
  }

  public async findById(appointmentId: string): Promise<Appointment | null> {
    const result = await this.client.send(
      new GetCommand({ TableName: this.tableName, Key: { appointmentId } }),
    );
    if (!result.Item) {
      return null;
    }
    return Appointment.fromPrimitives(result.Item as AppointmentPrimitives);
  }

  public async findByInsuredId(insuredId: InsuredId): Promise<Appointment[]> {
    const result = await this.client.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: this.insuredIdIndexName,
        KeyConditionExpression: 'insuredId = :insuredId',
        ExpressionAttributeValues: { ':insuredId': insuredId.value },
      }),
    );
    return (result.Items ?? []).map((item) =>
      Appointment.fromPrimitives(item as AppointmentPrimitives),
    );
  }
}
