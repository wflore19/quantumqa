import { Email, Entity } from '@quantumqa/types';
import { z } from 'zod';

// Schemas

export const Admin = Entity.extend({
  email: Email,
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
});

export const AddAdminInput = Admin.pick({
  email: true,
  firstName: true,
  lastName: true,
});

// Types

export type Admin = z.infer<typeof Admin>;
export type AddAdminInput = z.infer<typeof AddAdminInput>;
