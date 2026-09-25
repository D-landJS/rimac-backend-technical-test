import { APIGatewayProxyEvent } from 'aws-lambda';
import { AppointmentController } from '@infrastructure/adapters/http/controllers/AppointmentController';
import { CreateAppointmentUseCase } from '@application/use-cases/CreateAppointmentUseCase';
import { ListAppointmentsByInsuredIdUseCase } from '@application/use-cases/ListAppointmentsByInsuredIdUseCase';
import { ValidationError } from '@shared/errors/ValidationError';

function buildEvent(overrides: Partial<APIGatewayProxyEvent>): APIGatewayProxyEvent {
  return { body: null, pathParameters: null, ...overrides } as APIGatewayProxyEvent;
}

describe('AppointmentController', () => {
  describe('create', () => {
    it('llama al caso de uso cuando el body tiene la forma correcta', async () => {
      const createUseCase = { execute: jest.fn().mockResolvedValue({}) } as unknown as CreateAppointmentUseCase;
      const listUseCase = {} as ListAppointmentsByInsuredIdUseCase;
      const controller = new AppointmentController(createUseCase, listUseCase);

      const event = buildEvent({
        body: JSON.stringify({ insuredId: '00123', scheduleId: 100, countryISO: 'PE' }),
      });

      await controller.create(event);

      expect(createUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({ insuredId: '00123', scheduleId: 100, countryISO: 'PE' }),
      );
    });

    it('rechaza con ValidationError si un campo tiene el tipo incorrecto (scheduleId como string)', async () => {
      const createUseCase = { execute: jest.fn() } as unknown as CreateAppointmentUseCase;
      const listUseCase = {} as ListAppointmentsByInsuredIdUseCase;
      const controller = new AppointmentController(createUseCase, listUseCase);

      const event = buildEvent({
        body: JSON.stringify({ insuredId: '00123', scheduleId: '100', countryISO: 'PE' }),
      });

      await expect(controller.create(event)).rejects.toThrow(ValidationError);
      expect(createUseCase.execute).not.toHaveBeenCalled();
    });

    it('rechaza con ValidationError si falta el body', async () => {
      const createUseCase = { execute: jest.fn() } as unknown as CreateAppointmentUseCase;
      const listUseCase = {} as ListAppointmentsByInsuredIdUseCase;
      const controller = new AppointmentController(createUseCase, listUseCase);

      await expect(controller.create(buildEvent({ body: null }))).rejects.toThrow(ValidationError);
      expect(createUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('llama al caso de uso con el insuredId de la url', async () => {
      const createUseCase = {} as CreateAppointmentUseCase;
      const listUseCase = { execute: jest.fn().mockResolvedValue([]) } as unknown as ListAppointmentsByInsuredIdUseCase;
      const controller = new AppointmentController(createUseCase, listUseCase);

      await controller.list(buildEvent({ pathParameters: { insuredId: '00123' } }));

      expect(listUseCase.execute).toHaveBeenCalledWith('00123');
    });

    it('rechaza con ValidationError si falta insuredId en la url', async () => {
      const createUseCase = {} as CreateAppointmentUseCase;
      const listUseCase = { execute: jest.fn() } as unknown as ListAppointmentsByInsuredIdUseCase;
      const controller = new AppointmentController(createUseCase, listUseCase);

      await expect(controller.list(buildEvent({ pathParameters: null }))).rejects.toThrow(ValidationError);
      expect(listUseCase.execute).not.toHaveBeenCalled();
    });
  });
});
