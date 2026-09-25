import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { resolveAwsClientOptions } from '@infrastructure/config/resolveAwsClientOptions';

const client = new DynamoDBClient(resolveAwsClientOptions());

export const dynamoDocumentClient = DynamoDBDocumentClient.from(client);
