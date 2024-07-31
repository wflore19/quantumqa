import { db } from '@quantumqa/quantumdb';
import { ApplicationStatus } from '@quantumqa/types';

import { type GetBullJobData } from '@/infrastructure/bull/bull.types';

export async function onApplicationCreated({
  applicationId,
}: GetBullJobData<'application.created'>) {}
