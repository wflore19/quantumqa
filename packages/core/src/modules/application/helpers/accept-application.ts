import { db } from '@quantumqa/db';
import { ApplicationStatus } from '@quantumqa/types';

import { type GetBullJobData } from '@/infrastructure/bull/bull.types';
import { job } from '@/infrastructure/bull/helpers/job';

export async function acceptApplication({
  applicationId,
}: GetBullJobData<'application.accepted'>) {
  await db
    .updateTable('application')
    .set({
      status: ApplicationStatus.ACCEPTED,
    })
    .where('id', '=', applicationId)
    .execute();

  // job('application.accepted', {
  //   applicationId,
  // });
}
