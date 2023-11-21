import passport from 'passport';
import ApiError, { Forbidden, Unauthorized } from '../../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { Role, UserActivityStatus } from '../../types/user';

const verifyCallback =
  (
    req: any,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
    allowedRole: Role | null = null,
  ) =>
  async (err: unknown, currentUser: User | false, info: unknown) => {
    if (!currentUser) {
      if (err && err instanceof ApiError) {
        return reject(err);
      } else throw new Unauthorized();
    }
    if (err || info) {
      return reject(new Unauthorized());
    }

    // Check if the user is not blocked.
    if (currentUser.activityStatus === UserActivityStatus.Blocked) {
      return reject(new Forbidden('Not allowed.'));
    }

    // Check if the user has correct access role.
    if (allowedRole !== null && currentUser.role !== allowedRole) {
      return reject(new Forbidden('Not allowed.'));
    }

    req.params.userId = currentUser.id;
    req.user = currentUser;

    resolve();
  };

const auth =
  (allowedRole: Role | null = null) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, allowedRole),
      )(req, res, next);
    })
      .then(() => next())
      .catch((error) => next(error));
  };

export default auth;
