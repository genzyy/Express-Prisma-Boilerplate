import * as cron from 'node-cron';
import apiMetadataRepository from '../repositories/apiMetadata';
import logger from '../core/logger';
import config from '../core/config';
import { ApiStatus } from '../types/apiMetadata';

export const ApiMaintenanceJob = cron.schedule(
  '*/10 * * * * *',
  async () => {
    let apiStatus = await apiMetadataRepository.getApiMetadata('status');
    if (!apiStatus) {
      logger.warn('Api status is null, adding status immediately.');
      apiStatus = await apiMetadataRepository.createApiMetadata('status', ApiStatus.Maintenance);
    }
    config.api.status = apiStatus.value;
    if (config.api.status === ApiStatus.Live) logger.info('Api is live.');
    else if (config.api.status === ApiStatus.Maintenance)
      logger.warn('Api is in maintenance mode.');
  },
  {
    scheduled: false,
  },
);
