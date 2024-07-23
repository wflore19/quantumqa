import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('admin')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('first_name', 'text', (col) => col.notNull())
    .addColumn('last_name', 'text')
    .addColumn('gender', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('feature_flags')
    .addColumn('id', 'text', (column) => {
      return column.primaryKey();
    })
    .addColumn('created_at', 'timestamptz', (column) => {
      return column.notNull().defaultTo(sql`now()`);
    })
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('name', 'text', (column) => {
      return column.notNull().unique();
    })
    .addColumn('description', 'text')
    .addColumn('enabled', 'boolean', (column) => {
      return column.notNull().defaultTo(false);
    })
    .execute();

  await db.schema
    .createTable('application')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('deleted_at', 'timestamp')
    .addColumn('first_name', 'text', (col) => col.notNull())
    .addColumn('last_name', 'text', (col) => col.notNull())
    .addColumn('full_name', 'text', (col) =>
      col.defaultTo(sql`first_name || ' ' || last_name`)
    )
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('gender', 'text', (col) => col.notNull())
    .addColumn('status', 'text', (col) => col.notNull());
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('admin').execute();
  await db.schema.dropTable('feature_flags').execute();
  await db.schema.dropTable('application').execute();
}
