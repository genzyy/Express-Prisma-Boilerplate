import passport from 'passport';
import ApiError, { Unauthorized } from '../../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const verifyCallback =
  (req: any, resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) =>
  async (err: unknown, currentUser: User | false, info: unknown) => {
    if (!currentUser) {
      if (err && err instanceof ApiError) {
        return reject(err);
      } else throw new Unauthorized();
    }
    if (err || info) {
      return reject(new Unauthorized());
    }

    req.params.userId = currentUser.id;
    req.user = currentUser;

    resolve();
  };

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(
      req,
      res,
      next,
    );
  })
    .then(() => next())
    .catch((error) => next(error));
};

export default auth;
