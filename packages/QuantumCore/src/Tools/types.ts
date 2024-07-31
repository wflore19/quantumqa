import { type ExtractValue } from '@quantumqa/types';

export type RawBodyRequest = Request & { rawBody?: Buffer };

export const Environment = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

// Types

export type Environment = ExtractValue<typeof Environment>;
