import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateAppointmentUseCase } from '@application/use-cases/CreateAppointmentUseCase';
import { ListAppointmentsByInsuredIdUseCase } from '@application/use-cases/ListAppointmentsByInsuredIdUseCase';
import { createAppointmentSchema, CreateAppointmentDTO } from '@application/dto/CreateAppointmentDTO';
import { AppCode } from '@shared/constants/AppCode';
import { successResponse } from '@shared/http/httpResponse';
import { ValidationError, FieldValidationDetail } from '@shared/errors/ValidationError';

export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly listAppointmentsUseCase: ListAppointmentsByInsuredIdUseCase,
  ) {}

  public async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const body = this.parseBody(event.body);
    const dto = this.toValidatedDto(body);

    const result = await this.createAppointmentUseCase.execute(dto);
    return successResponse(AppCode.APPOINTMENT_REQUEST_RECEIVED, result);
  }

  public async list(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const insuredId = event.pathParameters?.insuredId;
    if (!insuredId) {
      throw new ValidationError(AppCode.MISSING_INSURED_ID_PARAM);
    }

    const result = await this.listAppointmentsUseCase.execute(insuredId);
    return successResponse(AppCode.APPOINTMENTS_LISTED, result);
  }

  private parseBody(rawBody: string | null): Record<string, unknown> {
    if (!rawBody) {
      throw new ValidationError(AppCode.MISSING_REQUEST_BODY);
    }
    try {
      return JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      throw new ValidationError(AppCode.INVALID_JSON_BODY);
    }
  }

  private toValidatedDto(body: Record<string, unknown>): CreateAppointmentDTO {
    const result = createAppointmentSchema.safeParse(body);
    if (!result.success) {
      const details: FieldValidationDetail[] = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        reason: issue.message,
      }));
      throw new ValidationError(AppCode.INVALID_REQUEST_SHAPE, details);
    }
    return result.data;
  }
}
