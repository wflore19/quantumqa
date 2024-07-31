import { db } from '@quantumqa/quantumdb';

export async function listFeatureFlags() {
  const flags = await db
    .selectFrom('featureFlags')
    .select(['description', 'displayName', 'enabled', 'id', 'name'])
    .orderBy('createdAt', 'desc')
    .execute();

  return flags;
}
