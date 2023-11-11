import EmailWorker from './email.worker';
import { Email } from '../../types/email';
import { Job } from 'bullmq';
import logger from '../../core/logger';
import { captureException } from '../../core/sentry';

EmailWorker.on('completed', (job: Job<Email>) => {
  logger.info(`Email sent to ${job.data.recipient} from ${job.data.sender}.`);
});

EmailWorker.on('failed', (job: Job<Email> | undefined, error) => {
  logger.info(`Sending email failed to ${job?.data.recipient} with error ${error}`);
  captureException(error, {
    recipient: job?.data.recipient,
    jobName: job?.name,
  });
});
