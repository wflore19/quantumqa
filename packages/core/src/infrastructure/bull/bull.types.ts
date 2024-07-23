import { type ExtractValue } from '@quantumqa/types';
import { Application } from '@quantumqa/types';
import { z } from 'zod';

export const BullQueue = {
  APPLICATION: 'application',
} as const;

export type BullQueue = ExtractValue<typeof BullQueue>;

export const ApplicationBullJob = z.discriminatedUnion('name', [
  z.object({
    name: z.literal('application.accepted'),
    data: z.object({
      applicationId: Application.shape.id,
    }),
  }),
  z.object({
    name: z.literal('application.created'),
    data: z.object({
      applicationId: Application.shape.id,
    }),
  }),
  z.object({
    name: z.literal('application.rejected'),
    data: z.object({
      applicationId: Application.shape.id,
    }),
  }),
  z.object({
    name: z.literal('application.review'),
    data: z.object({
      applicationId: Application.shape.id,
    }),
  }),
]);

// Combination

export const BullJob = z.union([z.any(), z.any()]);

// Types

export type BullJob = z.infer<typeof BullJob>;

export type GetBullJobData<Name extends BullJob['name']> = Extract<
  BullJob,
  { name: Name }
>['data'];
