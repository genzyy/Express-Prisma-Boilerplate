import { Worker } from 'bullmq';
import { queueRedisConfig } from './queueRedisConfig';
import { EMAIL_QUEUE_IDENTIFIER } from '../../types/email';

export const EmailWorker = new Worker(EMAIL_QUEUE_IDENTIFIER, __dirname + '/email.processor.ts', {
  connection: queueRedisConfig,
});
