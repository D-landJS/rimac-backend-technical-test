import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppError } from '@shared/errors/AppError';
import { AppCode } from '@shared/constants/AppCode';
import { logger } from '@shared/logger/logger';
import { errorResponse } from '@shared/http/httpResponse';

type HttpHandler = (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;

export function withHttpErrorHandling(handler: HttpHandler): HttpHandler {
  return async (event) => {
    try {
      return await handler(event);
    } catch (error) {
      if (error instanceof AppError) {
        logger.warn(`Error de negocio: ${error.code}`, { message: error.message });
        return errorResponse(error.code, error.details);
      }
      logger.error('Error no controlado en handler HTTP', error instanceof Error ? error : new Error(String(error)));
      return errorResponse(AppCode.INTERNAL_SERVER_ERROR);
    }
  };
}
