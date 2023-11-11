import config from '../../core/config';
import { Email } from '../../types/email';
import { Queue } from 'bullmq';

export const EMAIL_QUEUE_NAME = 'mail-queue';

export const emailQueue = new Queue<Email>(EMAIL_QUEUE_NAME, {
  connection: {
    host: config.emailService.queue.redisHost,
    port: config.emailService.queue.redisPort,
  },
});
