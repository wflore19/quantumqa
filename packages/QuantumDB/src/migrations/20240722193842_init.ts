import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // await db.schema
  //   .createTable('admin')
  //   .addColumn('id', 'text', (col) => col.primaryKey())
  //   .addColumn('created_at', 'timestamp', (col) =>
  //     col.defaultTo(sql`now()`).notNull()
  //   )
  //   .addColumn('updated_at', 'timestamp', (col) =>
  //     col.defaultTo(sql`now()`).notNull()
  //   )
  //   .addColumn('deleted_at', 'timestamp')
  //   .addColumn('email', 'text', (col) => col.notNull().unique())
  //   .addColumn('first_name', 'text', (col) => col.notNull())
  //   .addColumn('last_name', 'text')
  //   .addColumn('gender', 'text', (col) => col.notNull())
  //   .execute();

  // await db.schema
  //   .createTable('application')
  //   .addColumn('id', 'text', (col) => col.primaryKey())
  //   .addColumn('created_at', 'timestamp', (col) =>
  //     col.defaultTo(sql`now()`).notNull()
  //   )
  //   .addColumn('updated_at', 'timestamp', (col) =>
  //     col.defaultTo(sql`now()`).notNull()
  //   )
  //   .addColumn('deleted_at', 'timestamp')
  //   .addColumn('first_name', 'text', (col) => col.notNull())
  //   .addColumn('last_name', 'text', (col) => col.notNull())
  //   .addColumn('email', 'text', (col) => col.notNull().unique())
  //   .addColumn('gender', 'text', (col) => col.notNull())
  //   .addColumn('status', 'text', (col) => col.notNull())
  //   .execute();

  await db.schema
    .createType('auth_provider_type')
    .asEnum(['GOOGLE', 'EMAIL', 'DISCORD'])
    .execute();

  await db.schema.createType('role_type').asEnum(['ADMIN', 'MEMBER']).execute();

  await db.schema
    .createTable('member')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
    .addColumn('last_name', 'varchar(50)', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('password_hash', 'varchar(255)')
    .addColumn('auth_provider', sql`auth_provider_type`, (col) => col.notNull())
    .addColumn('auth_provider_id', 'varchar(255)')
    .addColumn('role', sql`role_type`, (col) =>
      col.notNull().defaultTo('MEMBER')
    )
    .execute();

  await db.schema
    .createTable('feature_flag')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('name', 'varchar(50)', (column) => {
      return column.notNull().unique();
    })
    .addColumn('description', 'varchar(255)')
    .addColumn('enabled', 'boolean', (column) => {
      return column.notNull().defaultTo(false);
    })
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // await db.schema.dropTable('admin').execute();
  // await db.schema.dropTable('application').execute();
  await db.schema.dropTable('member').execute();
  await db.schema.dropTable('feature_flag').execute();
  await db.schema.dropType('auth_provider_type').execute();
  await db.schema.dropType('role_type').execute();
}
