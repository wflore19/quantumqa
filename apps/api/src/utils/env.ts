// Importing this file ensures that our application has all of the environment
// variables necessary to run. If any are missing, this file will throw an error
// and crash the application.

import { Environment } from '@quantumqa/core/api';
import { config } from 'dotenv';
import { z } from 'zod';

// Loads the .env file into `process.env`.
config();

const EnvironmentVariable = z.string().trim().min(1);

const BaseEnvironmentConfig = z.object({
  API_URL: EnvironmentVariable,
  DATABASE_URL: EnvironmentVariable,
  ENVIRONMENT: z.nativeEnum(Environment),
  GOOGLE_CLIENT_ID: EnvironmentVariable,
  GOOGLE_CLIENT_SECRET: EnvironmentVariable,
  JWT_SECRET: EnvironmentVariable,
  PORT: z.coerce.number(),
  REDIS_URL: EnvironmentVariable,
});

const EnvironmentConfig = z.discriminatedUnion('ENVIRONMENT', [
  BaseEnvironmentConfig.partial({
    GOOGLE_CLIENT_ID: true,
    GOOGLE_CLIENT_SECRET: true,
  }).extend({
    ENVIRONMENT: z.literal(Environment.DEVELOPMENT),
    SMTP_HOST: EnvironmentVariable.optional(),
    SMTP_PASSWORD: EnvironmentVariable.optional(),
    SMTP_USERNAME: EnvironmentVariable.optional(),
  }),
  BaseEnvironmentConfig.extend({
    ENVIRONMENT: z.literal(Environment.PRODUCTION),
  }),
]);

// Parse the environment variables into a type-safe object - will throw an
// error if it fails.
export const ENV = EnvironmentConfig.parse(process.env);
