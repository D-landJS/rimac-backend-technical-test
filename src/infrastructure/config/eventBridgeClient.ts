import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { resolveAwsClientOptions } from '@infrastructure/config/resolveAwsClientOptions';

export const eventBridgeClient = new EventBridgeClient(resolveAwsClientOptions());
