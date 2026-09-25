import { SNSClient } from '@aws-sdk/client-sns';
import { resolveAwsClientOptions } from '@infrastructure/config/resolveAwsClientOptions';

export const snsClient = new SNSClient(resolveAwsClientOptions());
