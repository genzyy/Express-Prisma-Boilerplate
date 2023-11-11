import { Worker } from 'bullmq';
import config from '../../core/config';

const EMAIL_WORKER_IDENTIFIER = 'MailWorker';

const EmailWorker = new Worker(EMAIL_WORKER_IDENTIFIER, __dirname + 'email.processor.ts', {
  connection: {
    host: config.emailService.queue.redisHost,
    port: config.emailService.queue.redisPort,
  },
  concurrency: config.emailService.queue.concurrency,
});

export default EmailWorker;
