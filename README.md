## Software Architecture

### Apps

- [Admin App](./apps/admin-app/package.json) - Internal admin tooling
- [API](./apps/api/package.json) - Handles all the background jobs

### Packages

- [Core](./packages/core/package.json)
- [DB](./packages/db/package.json)
- [Scipts](./packages//scripts/package.json)
- [Types](./packages/types/package.json)
- [UI](./packages/ui/package.json)
- [Utils](./packages/utils/package.json)

### Config

- [ESLINT-config](./config/eslint/package.json)
- [Typescript](./config/tsconfig/package.json)
- [Tailwindcss](./config/tailwind/package.json)

## Tech Stack

### Backend

- [BullMQ](./packages/core/src/infrastructure/bull/bull.ts) message queue.
- [Kysely](./packages/db/package.json) type query PSQL database.
- [PostgreSQL](./packages/db/src/utils/db.ts) to store all data.
- [Redis](./packages/core/src/infrastructure/redis.ts) to store key/value data.
- [Nodejs](./package.json) Javascript runtime.

### Frontend

- [Remix](./apps/admin-app/package.json) SSR web framework.
- [React](./apps/admin-app/package.json) user interface.
- [Tailwindcss](./config/tailwind/package.json) CSS.

### Tools

- [Turborepo](./turbo.json) manage monorepo architecture.
- [Typescript](./config/tsconfig/base.json) strict typing Javascript.
- [Zod](./packages/types/package.json) vaildate data and generate types.

## Contributing

something here just so its not empty
