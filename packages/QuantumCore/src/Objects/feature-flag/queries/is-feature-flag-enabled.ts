import { db } from '@quantumqa/quantumdb';

import { type FeatureFlagName } from '../feature-flag.types';

export async function isFeatureFlagEnabled(name: FeatureFlagName) {
  const enabledFlag = await db
    .selectFrom('featureFlags')
    .where('enabled', '=', true)
    .where('name', '=', name)
    .executeTakeFirst();

  return !!enabledFlag;
}
