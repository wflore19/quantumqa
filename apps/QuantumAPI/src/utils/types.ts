import { OAuthCodeState } from '@quantumqa/quantumcore/api';
import type { Request } from 'express';
import { z } from 'zod';

export type RawBodyRequest = Request & { rawBody?: Buffer };

export const AuthorizationCodeQuery = z.object({
  code: z.string().trim().min(1),
  state: z
    .string()
    .optional()
    .transform((value) => JSON.parse(value || '{}'))
    .transform((value) => OAuthCodeState.parse(value)),
});

export type AuthorizationCodeQuery = z.infer<typeof AuthorizationCodeQuery>;

export type HandleLoginInput = {
  query: AuthorizationCodeQuery;
  type: 'GOOGLE' | 'DISCORD' | 'EMAIL';
};
