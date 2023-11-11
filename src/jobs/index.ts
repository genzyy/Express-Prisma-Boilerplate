import { ApiMaintenanceJob } from './apiMaintenanace.job';

export const StartAllJobs = () => {
  ApiMaintenanceJob.start();
};

export const StopAllJobs = () => {
  ApiMaintenanceJob.stop();
};
