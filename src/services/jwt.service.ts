import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../core/config';
import { Unauthorized } from '../utils/ApiError';

const SECRET: string = config.jwt.secret;
const DEFAULT_EXPIRY: number = moment().add(1, 'days').unix();
const generateToken = (userId: number, exp: number = DEFAULT_EXPIRY): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp,
  };

  return jwt.sign(payload, SECRET);
};

const verifyToken = (token: string): number => {
  const payload = jwt.verify(token, SECRET);
  const { exp } = jwt.decode(token) as {
    exp: number;
  };
  if (exp < moment().unix()) {
    throw new Unauthorized('Token expired.');
  }
  const userId = Number(payload.sub);

  return userId;
};

const checkIfTokenIsOld = (token: string, signedOut: Date): boolean => {
  const unixTimestamp = Math.floor(signedOut.getTime() / 1000);
  const { iat, exp } = jwt.decode(token) as {
    iat: number;
    exp: number;
  };

  if (iat < unixTimestamp && exp > unixTimestamp) return true;
  return false;
};

const generateAuthTokenForUser = (userId: number) => {
  const accessToken = generateToken(userId);
  const refreshToken = generateToken(userId, moment().add(5, 'days').unix());

  return {
    accessToken: {
      token: accessToken,
      exp: 86400,
    },
    refreshToken: {
      token: refreshToken,
      exp: 432000,
    },
  };
};

export default { generateToken, verifyToken, generateAuthTokenForUser, checkIfTokenIsOld };
