import { SQSEvent, SQSBatchResponse, SQSRecord } from 'aws-lambda';
import { AppError } from '@shared/errors/AppError';
import { logger } from '@shared/logger/logger';

type SqsRecordProcessor = (record: SQSRecord) => Promise<void>;

export function withSqsErrorHandling(processRecord: SqsRecordProcessor) {
  return async (event: SQSEvent): Promise<SQSBatchResponse> => {
    const batchItemFailures: { itemIdentifier: string }[] = [];

    for (const record of event.Records) {
      try {
        await processRecord(record);
      } catch (error) {
        if (error instanceof AppError) {
          logger.warn(`Error de negocio procesando mensaje SQS [${error.code}]`, {
            messageId: record.messageId,
          });
        } else {
          logger.error(
            'Error no controlado procesando mensaje SQS',
            error instanceof Error ? error : new Error(String(error)),
          );
        }
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }

    return { batchItemFailures };
  };
}
