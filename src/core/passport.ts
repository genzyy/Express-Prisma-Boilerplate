import { Strategy, ExtractJwt, VerifyCallback } from 'passport-jwt';

import prisma from './prisma/client';
import config from './config';

const jwtOpt = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

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

    if (!currentUser || (currentUser.signedOut && payload.generated < currentUser.signedOut))
      return done(null, false);

    done(null, currentUser);
  } catch (error) {
    done(error, false);
  }
};

const JwtStrategy = new Strategy(jwtOpt, jwtVerify);

export default JwtStrategy;
