import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import {} from '@quantumqa/core/api';

import { healthRouter } from './routers/health.router';
// import { oauthRouter } from './routers/oauth.router';
import { ENV } from '../../../packages/core/src/utils/env';

// Some API endpoints require access to the `req.rawBody` buffer field, which
// is not available by default. We need to whitelist these endpoints so that
// the raw body is available to them.

async function bootstrap() {
  const app = express();

  app.use(cors({ credentials: true, origin: true }));
  app.use(helmet());

  app.use(healthRouter);
  // app.use(oauthRouter);

  initializeBullWorkers();

  app.listen(ENV.PORT, () => {
    console.log('API is up and running! 🚀');
    console.log(`http://localhost:${ENV.PORT}`);
  });
}

function initializeBullWorkers() {
  // applicationWorker.run();
}

bootstrap();
