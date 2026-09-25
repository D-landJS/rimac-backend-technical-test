/**
 * Utilidad de desarrollo: imprime el contenido completo de la tabla Appointments en LocalStack.
 * No es parte del codigo de la aplicacion (no se despliega). Uso: npm run inspect:dynamodb
 */
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const STAGE = process.env.STAGE || 'local';
const TABLE_NAME = process.env.APPOINTMENTS_TABLE_NAME || `Appointments-${STAGE}`;

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
  credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
});
const docClient = DynamoDBDocumentClient.from(client);

async function main() {
  const result = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
  const items = result.Items || [];

  console.log(`\nTabla: ${TABLE_NAME}  (${items.length} registros)\n`);
  if (items.length === 0) {
    console.log('(vacia)');
    return;
  }
  const formatStored = (peruIsoLike) => {
    const [datePart, timePart] = peruIsoLike.split('T');
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}, ${timePart.slice(0, 8)}`;
  };

  console.table(
    items.map((item) => ({
      appointmentId: item.appointmentId,
      insuredId: item.insuredId,
      scheduleId: item.scheduleId,
      countryISO: item.countryISO,
      status: item.status,
      createdAt: formatStored(item.createdAt),
      updatedAt: formatStored(item.updatedAt),
    })),
  );
}

main().catch((error) => {
  console.error('Error consultando DynamoDB:', error.message);
  process.exit(1);
});
