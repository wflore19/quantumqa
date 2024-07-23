import { db } from '@quantumqa/db';
import { ApplicationStatus } from '@quantumqa/types';

import { type GetBullJobData } from '@/infrastructure/bull/bull.types';

export async function rejectApplication({
  applicationId: string,
}: GetBullJobData<'application.rejected'>) {
  await db
    .updateTable('application')
    .set({
      status: ApplicationStatus.REJECTED,
    })
    .where('id', '=', applicationId)
    .execute();
}
