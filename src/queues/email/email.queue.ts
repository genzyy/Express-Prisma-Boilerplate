import { EMAIL_QUEUE_IDENTIFIER, Email } from '../../types/email';
import { Queue, Job } from 'bullmq';
import { queueRedisConfig } from './queueRedisConfig';
import { EmailWorker } from './email.worker';
import logger from '../../core/logger';
import { captureException } from '../../core/sentry';

export const EmailQueue = new Queue<Email>(EMAIL_QUEUE_IDENTIFIER, {
  connection: queueRedisConfig,
});

EmailWorker.on('ready', () => {
  logger.info(`Email queue worker ready.`);
});

EmailWorker.on('completed', (job: Job<Email>) => {
  logger.info(`Email sent to ${job.data.recipient} from ${job.data.sender}.`);
});

EmailWorker.on('failed', (job: Job<Email> | undefined, error: any) => {
  logger.warn(`Sending email failed to ${job?.data.recipient} with error ${error}`);
  captureException(error, {
    recipient: job?.data.recipient,
    jobName: job?.name,
  });
});
