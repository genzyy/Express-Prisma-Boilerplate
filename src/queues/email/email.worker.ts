import { Worker } from 'bullmq';
import config from '../../core/config';

const MAIL_WORKER_NAME = 'MailWorker';

const EmailWorker = new Worker(MAIL_WORKER_NAME, __dirname + 'email.processor.ts', {
  connection: {
    host: config.queue.redisHost,
    port: config.queue.redisPort,
  },
  concurrency: config.queue.concurrency,
});

export default EmailWorker;
