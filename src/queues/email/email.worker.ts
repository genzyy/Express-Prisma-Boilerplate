import { Worker } from 'bullmq';
import { redisConfig } from './redisConfig';
import { EMAIL_QUEUE_IDENTIFIER } from '../../types/email';

const EmailWorker = new Worker(EMAIL_QUEUE_IDENTIFIER, __dirname + '/email.processor.ts', {
  connection: redisConfig,
});

export default EmailWorker;
