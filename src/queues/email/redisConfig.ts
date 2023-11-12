import Redis from 'ioredis';
import logger from '../../core/logger';

export const redisConfig = new Redis({
  port: 6380,
  host: '127.0.0.1',
  maxRetriesPerRequest: null,
});

redisConfig.connect(() => {
  logger.info('Connected to queue redis.');
});
