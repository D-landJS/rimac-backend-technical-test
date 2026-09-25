# Rimac Appointment Backend

Backend serverless (AWS Lambda + API Gateway + DynamoDB + SNS + SQS + EventBridge) para el
agendamiento de citas medicas de asegurados en Peru y Chile. Reto Tecnico Backend - Rimac.

## Requisitos previos

- Node.js >= 20 (probado con Node 24)
- AWS CLI

## Instalacion

```bash
npm install
cp .env.example .env
```

## Pruebas unitarias

```bash
npm test
npm run test:coverage
```

## Documentacion de la API (OpenAPI / Swagger)

El spec completo esta en [openapi/openapi.yml](./openapi/openapi.yml). Para verlo de forma
interactiva, cualquiera de estas opciones sirve (no requieren desplegar nada):

- Pegar el contenido en <https://editor.swagger.io>
- Extension "OpenAPI (Swagger) Editor" de VS Code
- Preview local (no instala nada de forma permanente):
  ```bash
  npx @redocly/cli preview-docs openapi/openapi.yml
  ```

## Despliegue a AWS real

```bash
sls deploy
```

Requiere credenciales AWS configuradas (`aws configure` o variables `AWS_PROFILE`) y las variables
`DB_PE_*` / `DB_CL_*` en `.env` apuntando al RDS real de cada pais (ver `.env.example`).

## Estructura del proyecto

```
src/
  domain/            entidades, value objects, errores de negocio, ports (interfaces). Cero deps externas.
  application/        casos de uso (orquestan domain + ports) y sus DTOs. Cero AWS SDK, cero SQL.
  infrastructure/      adapters que implementan los ports (DynamoDB, MySQL, SNS, EventBridge, HTTP)
  handlers/           un archivo por Lambda: parsea el evento y llama al controller/use case, sin logica.
  shared/              constantes de codigo/mensaje, error base, http response builder, logger.
```
