import { Strategy, ExtractJwt, VerifyCallback } from 'passport-jwt';

import prisma from './prisma/client';
import config from './config';
import { Unauthorized } from '../utils/ApiError';
import passport from 'passport';
import { User } from '@prisma/client';

const jwtOpt = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: User, done) {
  done(null, user);
});

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    const currentUser = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        signedOut: true,
      },
      where: { id: payload.sub },
    });

    const signedOutTimestamp = currentUser?.signedOut
      ? Math.floor(currentUser.signedOut.getTime() / 1000)
      : null;

    if (
      (!currentUser && !payload) ||
      (currentUser &&
        currentUser.signedOut &&
        signedOutTimestamp &&
        payload.iat <= signedOutTimestamp)
    ) {
      return done(new Unauthorized('Expired token.'), false);
    }

    done(null, currentUser ?? false);
  } catch (error) {
    done(error, false);
  }
};

const JwtStrategy = new Strategy(jwtOpt, jwtVerify);
export default JwtStrategy;
