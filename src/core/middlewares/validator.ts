import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import filter from '../../utils/filter';
import { BadRequest } from '../../utils/ApiError';

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = filter(schema, ['params', 'query', 'body']);
  const obj = filter(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({
      errors: { label: 'key' },
      abortEarly: false,
    })
    .validate(obj);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new BadRequest(errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;
