import { resolveLocalstackEndpoint } from '@infrastructure/config/resolveLocalstackEndpoint';

interface AwsClientOptions {
  region: string;
  endpoint?: string;
}

export function resolveAwsClientOptions(): AwsClientOptions {
  const localstackEndpoint = resolveLocalstackEndpoint();
  return {
    region: process.env.AWS_REGION ?? 'us-east-1',
    ...(localstackEndpoint ? { endpoint: localstackEndpoint } : {}),
  };
}
