import { db } from '@quantumqa/quantumdb';
import { ApplicationStatus } from '@quantumqa/types';

import { type GetBullJobData } from '@/infrastructure/bull/bull.types';

export async function rejectApplication({
  applicationId,
}: GetBullJobData<'application.rejected'>) {
  await db
    .updateTable('application')
    .set({
      status: ApplicationStatus.REJECTED,
    })
    .where('id', '=', applicationId)
    .execute();
}
