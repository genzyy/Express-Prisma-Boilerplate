import { Worker } from 'bullmq';
import config from '../../core/config';

const MAIL_WORKER_NAME = 'MailWorker';

const EmailWorker = new Worker(MAIL_WORKER_NAME, __dirname + 'email.processor.ts', {
  connection: {
    host: config.emailService.queue.redisHost,
    port: config.emailService.queue.redisPort,
  },
  concurrency: config.emailService.queue.concurrency,
});

export default EmailWorker;
