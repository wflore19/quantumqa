import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(quarterOfYear);
dayjs.extend(timezone);

// This is only meant to be imported by the `api` application.
export { job } from './infrastructure/bull/helpers/job';
export { applicationWorker } from './modules/application/application.worker';
// export { loginWithOAuth } from './modules/authentication/use-cases/login-with-oauth';
export { Environment } from './utils/types';
