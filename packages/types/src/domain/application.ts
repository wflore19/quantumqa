import { z } from 'zod';

import { Entity } from './types';
import { type ExtractValue } from '../utils/types';

// Enums

export const ApplicationStatus = {
  ACCEPTED: 'accepted',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const;

// Schemas

export const Application = Entity.extend({
  firstName: z.string().trim().min(1).toLowerCase(),
  lastName: z.string().trim().min(1).toLowerCase(),
  fullName: z.string().trim().min(1).toLowerCase(),
  email: z
    .string()
    .trim()
    .min(1)
    .toLowerCase()
    .email()
    .refine((value) => {
      return (
        value.endsWith('.edu') ||
        value.endsWith('.com') ||
        value.endsWith('gmail.com') ||
        value.endsWith('outlook.com')
      );
    }, 'Must be a valid email.'),
  gender: z.string().min(1).toLowerCase(),
  status: z.nativeEnum(ApplicationStatus),
});

// Types

export type Application = z.infer<typeof Application>;
export type ApplicationStatus = ExtractValue<typeof ApplicationStatus>;
