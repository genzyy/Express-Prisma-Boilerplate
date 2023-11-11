import * as cron from 'node-cron';
import logger from '../core/logger';

export const ApiMaintenanceJob = cron.schedule(
  '10 * * * * *',
  () => {
    logger.info('API maintenance job started...');
  },
  {
    scheduled: false,
  },
);
