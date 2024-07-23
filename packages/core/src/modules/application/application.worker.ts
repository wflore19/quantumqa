import { match } from 'ts-pattern';

import { ApplicationBullJob } from '@/infrastructure/bull/bull.types';
import { registerWorker } from '@/infrastructure/bull/helpers/register-worker';
import { acceptApplication } from './helpers/accept-application';
import { createApplication } from './helpers/create-application';
import { rejectApplication } from './helpers/reject-application';
// import { reviewApplication } from './helpers/review-application.ts';

export const applicationWorker = registerWorker(
  'application',
  ApplicationBullJob,
  async (job) => {
    return match(job)
      .with({ name: 'application.created' }, ({ data }) => {
        return createApplication(data);
      })
      .with({ name: 'application.accepted' }, ({ data }) => {
        return acceptApplication(data);
      })
      .with({ name: 'application.rejected' }, ({ data }) => {
        return rejectApplication(data);
      })
      .exhaustive();
  }
);
