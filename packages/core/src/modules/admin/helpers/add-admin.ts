import { db } from '@quantumqa/db';
import { id } from '@quantumqa/utils';

import { type AddAdminInput } from '../admin.types';

/**
 * Adds a new admin. This will grant the user access to the Admin
 * Dashboard. If an existing admin already exists with the same email, this will
 * return an `Error`.
 */
export async function addAdmin({ email, firstName, lastName }: AddAdminInput) {
  const existingAdmin = await db
    .selectFrom('admins')
    .where('email', 'ilike', email)
    .executeTakeFirst();

  if (existingAdmin) {
    return new Error('An admin already exists with this email.');
  }

  await db
    .insertInto('admins')
    .values({
      email,
      firstName,
      id: id(),
      lastName,
    })
    .execute();
}
