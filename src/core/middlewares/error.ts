import { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../config';
import logger from '../logger';
import ApiError from '../../utils/ApiError';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = undefined;
  const { statusCode: errStatusCode, message: errMessage } = err;
  if (!(err instanceof ApiError)) {
    const statusCode =
      errStatusCode || err instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.SERVICE_UNAVAILABLE;
    const message = errMessage || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false);
    next(error);
  } else next(err);
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  const { isOperational } = err;
  if (config.environment === 'production' && !isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode];
  }

  res.locals.errorMessage = message;

  const response = {
    code: statusCode,
    message,
  };

  if (config.environment === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
