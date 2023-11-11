import { NOT_FOUND, UNAUTHORIZED, FORBIDDEN, BAD_REQUEST, SERVICE_UNAVAILABLE } from 'http-status';

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string | undefined, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

class NotFound extends ApiError {
  message: string;

  constructor(message: string = 'Not found') {
    super(NOT_FOUND, message);
    this.message = message;
  }
}

class Unauthorized extends ApiError {
  message: string;

  constructor(message: string = 'Not authorized') {
    super(UNAUTHORIZED, message);
    this.message = message;
  }
}

class Forbidden extends ApiError {
  message: string;

  constructor(message: string = 'Forbidden') {
    super(FORBIDDEN, message);
    this.message = message;
  }
}

class BadRequest extends ApiError {
  message: string;
  constructor(message: string = 'Bad request') {
    super(BAD_REQUEST, message);
    this.message = message;
  }
}

class ApiUnavailable extends ApiError {
  message: string;
  constructor(message: string = 'Api is on maintenance mode.') {
    super(SERVICE_UNAVAILABLE, message);
    this.message = message;
  }
}

export default ApiError;

export { Unauthorized, Forbidden, BadRequest, NotFound, ApiUnavailable };
