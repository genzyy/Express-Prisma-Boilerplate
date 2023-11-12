import logger from '../core/logger';
import { ApiMaintenanceJob } from './apiMaintenanace.job';

export const StartAllJobs = () => {
  ApiMaintenanceJob.start();
  logger.info('API maintenance job started...');
};

export const StopAllJobs = () => {
  ApiMaintenanceJob.stop();
};
