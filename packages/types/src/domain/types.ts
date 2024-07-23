import { z } from 'zod';

// Core

export const Entity = z.object({
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional(),
  id: z.string().trim().min(1),
  updatedAt: z.coerce.date(),
});

export type Entity = z.infer<typeof Entity>;

// General

export const Address = z.object({
  city: z.string().trim().min(1),
  line1: z.string().trim().min(1),
  line2: z.string().trim().optional(),
  state: z.string().trim().min(1),
  zip: z.string().trim().min(1),
});

export type Address = z.infer<typeof Address>;

export const Email = z
  .string()
  .trim()
  .min(1)
  .email()
  .transform((value) => {
    return value.toLowerCase();
  });

export type Email = z.infer<typeof Email>;

// Enums
