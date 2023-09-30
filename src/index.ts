import { Server } from 'http';
import app from './app';
import config from './core/config';
import prisma from './core/prisma/client';
import logger from './core/logger';

let server: Server;
prisma.$connect().then(() => {
  logger.info('Connected to db.');
  server = app.listen(config.port, () => {
    logger.info(`Running on ${config.port} and ${config.environment} env.`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed.');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
