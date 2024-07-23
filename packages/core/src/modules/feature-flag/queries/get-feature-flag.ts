import { type DB, db } from '@quantumqa/db';
import { type SelectExpression } from 'kysely';

type GetMembersOptions<Selection> = {
  select: Selection[];
  where: { id: string };
};

export async function getFeatureFlag<
  Selection extends SelectExpression<DB, 'featureFlags'>,
>({ select, where }: GetMembersOptions<Selection>) {
  const flag = await db
    .selectFrom('featureFlags')
    .select(select)
    .where('id', '=', where.id)
    .executeTakeFirst();

  return flag;
}
