import { type JobsOptions } from 'bullmq';

import { QueueFromName } from '../bull';
import { BullJob, type BullQueue, type GetBullJobData } from '../bull.types';

export function job<JobName extends BullJob['name']>(
  name: JobName,
  data: GetBullJobData<JobName>,
  options?: JobsOptions
) {
  const result = BullJob.safeParse({
    data,
    name,
  });

  if (!result.success) {
    return;
  }

  const job = result.data;

  const queueName = QueueNameFromJobName[job.name];
  const queue = QueueFromName[queueName];

  queue.add(job.name, job.data, options).catch((e: Error) => console.error(e));
}

const QueueNameFromJobName: Record<BullJob['name'], BullQueue> = {};
