import { Worker } from 'bullmq';
import { redisConfig } from './redisConfig';

const EmailWorker = new Worker('email-queue', __dirname + '/email.processor.ts', {
  connection: redisConfig,
});

export default EmailWorker;
