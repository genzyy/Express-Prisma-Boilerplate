import passport from 'passport';
import { Unauthorized } from '../../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const verifyCallback =
  (req: any, resolve: (value?: unknown) => void, reject: (reason?: unknown) => void) =>
  async (err: unknown, currentUser: User | false, currentUserId: number | false, info: unknown) => {
    if (err || info || !currentUser) {
      return reject(new Unauthorized());
    }

    req.currentUser = currentUser;
    req.currentUserId = currentUserId;

    resolve();
  };

const auth = async (req: Request, res: Response, next: NextFunction) => {
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
