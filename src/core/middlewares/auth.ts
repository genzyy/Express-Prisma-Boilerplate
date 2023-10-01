import passport from 'passport';
import { Forbidden, Unauthorized } from '../../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { roleActions } from '../roles';

const verifyCallback =
  (
    req: any,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
    rights: string[],
  ) =>
  async (err: unknown, currentUser: User | false, info: unknown) => {
    if (err || info || !currentUser) {
      return reject(new Unauthorized());
    }

    req.user = currentUser;

    if (rights.length) {
      const userRights: string[] = (roleActions.get(currentUser.role) as unknown as string[]) ?? [];
      const isAllowed: boolean = rights.every((right) => userRights.includes(right));

      if (!isAllowed && currentUser.id != req.params.userId) {
        return reject(new Forbidden());
      }
    }
    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights),
      )(req, res, next);
    })
      .then(() => next())
      .catch((error) => next(error));
  };

export default auth;
