import { z } from 'zod';

import { type ExtractValue } from '../utils/types';

// Enums

export const ApplicationStatus = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const;

// Schemas

export const Application = z.object({
  id: z.string(),
  name: z.string(),
  status: z.nativeEnum(ApplicationStatus),
});

// Types

export type Application = z.infer<typeof Application>;
export type ApplicationStatus = ExtractValue<typeof ApplicationStatus>;
