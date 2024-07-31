import { type Transaction } from 'kysely';
import readline from 'readline';
import { z } from 'zod';

import { migrate } from '../helpers/migrate';
import { truncate } from '../helpers/truncate';
import { db } from '../utils/db';
import { IS_PRODUCTION } from '../utils/env';
import { type DB } from '../utils/types';

if (IS_PRODUCTION) {
  throw new Error('Cannot seed database in non-development environment.');
}

async function main() {
  try {
    // await setEmailFromCommandLine();
    console.log('(1/4) Email looks good. ✅');

    await migrate({ db });
    console.log('(2/4) Ran migrations and initialized tables. ✅');

    await db.transaction().execute(async (trx) => {
      await truncate(trx);
      await seed(trx);
    });

    console.log('(3/4) Wiped all data. ✅');
    console.log('(4/4) Seeded the database. ✅');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

// let email = '';

async function seed(trx: Transaction<DB>) {
  const personId1 = id();

  await trx
    .insertInto('admin')
    .values([
      {
        id: personId1,
        email: 'wflore@umd.edu',
        firstName: 'Wilfredo',
        lastName: 'Flores',
        gender: 'male',
      },
    ])
    .execute();
}

async function setEmailFromCommandLine() {
  const answer = await question(
    'In order to log into the Member Profile and Admin Dashboard, you will need both a member record and an admin record. Please provide an email so we can create those for you.\n' +
      'Email: '
  );

  const result = z
    .string()
    .trim()
    .min(1)
    .email()
    .transform((value) => {
      return value.toLowerCase();
    })
    .safeParse(answer);

  if (!result.success) {
    throw new Error('The email you provided was invalid.');
  }

  // email = result.data;
}

async function question(prompt: string) {
  const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    cli.question(prompt, (input) => {
      resolve(input);
      cli.close();
    });
  });
}

let counter = 0;

function id() {
  counter++;

  return counter.toString();
}

main();
