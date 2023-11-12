import Redis from 'ioredis';
import logger from '../../core/logger';
import config from '../../core/config';

export const queueRedisConfig = new Redis({
  port: config.emailService.queue.redisPort,
  host: config.emailService.queue.redisHost,
  maxRetriesPerRequest: null,
});

queueRedisConfig.connect(() => {
  logger.info('Connected to queue redis.');
});
