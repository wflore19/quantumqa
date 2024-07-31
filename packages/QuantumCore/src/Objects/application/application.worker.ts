import { match } from 'ts-pattern';

import { ApplicationBullJob } from '@/infrastructure/bull/bull.types';
import { registerWorker } from '@/infrastructure/bull/helpers/register-worker';
import { onApplicationAccepted } from '@/Objects/application/jobs/application-accepted';
import { onApplicationCreated } from '@/Objects/application/jobs/application-created';
import { onApplicationRejected } from '@/Objects/application/jobs/application-rejected';

export const applicationWorker = registerWorker(
  'application',
  ApplicationBullJob,
  async (job) => {
    return match(job)
      .with({ name: 'application.created' }, ({ data }) => {
        return onApplicationCreated(data);
      })
      .with({ name: 'application.accepted' }, ({ data }) => {
        return onApplicationAccepted(data);
      })
      .with({ name: 'application.rejected' }, ({ data }) => {
        return onApplicationRejected(data);
      })
      .exhaustive();
  }
);
