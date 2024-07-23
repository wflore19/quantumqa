import { z } from 'zod';

export type ExtractValue<T extends object> = T[keyof T];

export const BullQueue = {
  APPLICATION: 'application',
} as const;

export type BullQueue = ExtractValue<typeof BullQueue>;

// Combination

export const BullJob = z.union([z.any(), z.any()]);

// Types

export type BullJob = z.infer<typeof BullJob>;

export type GetBullJobData<Name extends BullJob['name']> = Extract<
  BullJob,
  { name: Name }
>['data'];
