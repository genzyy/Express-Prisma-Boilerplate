import { CREATED, OK } from 'http-status';
import { Request, Response } from 'express';
import userRepository from '../repositories/user';
import catchAsync from '../utils/catchAsync';
import JwtService from '../services/jwt.service';
import EmailService from '../services/email.service';
import { NotFound, Unauthorized } from '../utils/ApiError';
import exclude from '../utils/exclude';
import { UserReturn } from '../types/user';

const register = catchAsync(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const user = await userRepository.createUser(username, email, password);
  const tokens = JwtService.generateAuthTokenForUser(user.id);

  await EmailService.sendOnboardingEmail(user.email, user.name ?? '');

  return res.status(CREATED).send({ user: exclude(user, ['id', 'password', 'signedOut']), tokens });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const accessToken = await getUserAccessToken(req);
  const userId = JwtService.verifyToken(accessToken);
  const user = await userRepository.getUserByEmailAndId(email, userId);

  if (!user) {
    throw new NotFound('User not found');
  }

  if (password !== user?.password) throw new Unauthorized('Password doesnt match.');

  return res.send(OK).send({ user: exclude(user, ['password', 'signedOut']) });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const accessToken = await getUserAccessToken(req);
  const userId = JwtService.verifyToken(accessToken);
  const dbUser = await userRepository.getUser(userId, UserReturn);
  return res.status(OK).send({ ...dbUser });
});

const getUserAccessToken = async (req: Request): Promise<string> => {
  const { authorization } = req.headers;
  const values = authorization?.split(' ');
  if (values && values.length >= 2) return values[1];
  throw new Unauthorized('Token missing.');
};

export default { register, login, getMe };
