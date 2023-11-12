import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export interface CustomParamsDict {
  [key: string]: any;
}

const catchAsync =
  (fn: RequestHandler<CustomParamsDict, any, any, qs.ParsedQs, Record<string, any>>) =>
  (
    req: Request<CustomParamsDict, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
    next: NextFunction,
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      return next(err);
    });
  };

export default catchAsync;
