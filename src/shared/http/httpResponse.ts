import { APIGatewayProxyResult } from 'aws-lambda';
import { AppCode, AppCodeName } from '@shared/constants/AppCode';
import { AppMessage } from '@shared/constants/AppMessage';
import { httpStatusByAppCode } from '@shared/http/httpStatusByAppCode';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export function successResponse<T>(code: AppCode, data: T): APIGatewayProxyResult {
  return {
    statusCode: httpStatusByAppCode[code],
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ code, name: AppCodeName[code], message: AppMessage[code], data }),
  };
}

export function errorResponse(code: AppCode, details?: unknown): APIGatewayProxyResult {
  return {
    statusCode: httpStatusByAppCode[code],
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      code,
      name: AppCodeName[code],
      message: AppMessage[code],
      ...(details ? { details } : {}),
    }),
  };
}
