import { Email } from '../../types/email';
import { Queue, Job } from 'bullmq';
import { redisConfig } from './redisConfig';
import EmailWorker from './email.worker';
import logger from '../../core/logger';
import { captureException } from '../../core/sentry';

export const EMAIL_QUEUE_IDENTIFIER = 'email-queue';

export const emailQueue = new Queue<Email>('email-queue', {
  connection: redisConfig,
});

EmailWorker.on('ready', () => {
  logger.info(`Email queue worker ready.`);
});

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
