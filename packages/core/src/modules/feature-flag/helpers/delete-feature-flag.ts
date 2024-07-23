import { db } from '@quantumqa/db';

export async function deleteFeatureFlag(id: string) {
  await db.deleteFrom('featureFlags').where('id', '=', id).execute();
}
