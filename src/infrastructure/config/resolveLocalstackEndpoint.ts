export function resolveLocalstackEndpoint(): string | undefined {
  if (process.env.LOCALSTACK_HOSTNAME) {
    const port = process.env.EDGE_PORT ?? '4566';
    return `http://${process.env.LOCALSTACK_HOSTNAME}:${port}`;
  }
  return process.env.LOCALSTACK_ENDPOINT || undefined;
}
