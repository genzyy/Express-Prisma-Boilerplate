import { Response } from 'express';
import morgan from 'morgan';

import config from './config';
import logger from './logger';

morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

const getIPAddressFormat = () => (config.environment === 'production' ? ':remote-addr - ' : '');

const successResFormat = `${getIPAddressFormat()}:status :method :url  (:res[content-length]) - :response-time ms`;

const errorResFormat = `${getIPAddressFormat()}:status :method :url (:res[content-length]) - :response-time ms`;

export const successHandler = morgan(successResFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

export const errorHandler = morgan(errorResFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default { successHandler, errorHandler };
