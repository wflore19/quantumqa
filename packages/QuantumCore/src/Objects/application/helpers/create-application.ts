import { db } from '@quantumqa/quantumdb';
import { type Application, ApplicationStatus } from '@quantumqa/types';
import { id } from '@quantumqa/quantumtools';

export async function createApplication(data: Application) {
  await db.insertInto('application').values({
    id: id(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    status: ApplicationStatus.PENDING,
  });
}
