import { OK } from 'http-status';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories';
import { catchAsync, exclude } from '../utils';
import { JwtService } from '../services';
import EmailService from '../services/email.service';
import { NotFound, Unauthorized } from '../utils/ApiError';
import { UserReturn } from '../types/user';

const register = catchAsync(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const user = await UserRepository.createUser(username, email, password);
  const tokens = JwtService.generateAuthTokenForUser(user.id);

  await EmailService.sendOnboardingEmail(user.email, user.username);

  return res.status(OK).send({ user: exclude(user, ['id', 'password', 'signedOut']), tokens });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserRepository.getUserByEmail(email);

  if (!user) {
    throw new NotFound('User not found');
  }

  if (password !== user?.password) throw new Unauthorized('Password doesnt match.');

  return res.status(OK).send({ user: exclude(user, ['password', 'signedOut']) });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const accessToken = await getUserAccessToken(req);
  const userId = JwtService.verifyToken(accessToken);
  const dbUser = await UserRepository.getUser(userId, UserReturn);
  return res.status(OK).send({ ...dbUser });
});

const getUserAccessToken = async (req: Request): Promise<string> => {
  const { authorization } = req.headers;
  const values = authorization?.split(' ');
  if (values && values.length >= 2) return values[1];
  throw new Unauthorized('Token missing.');
};

const logOutUser = catchAsync(async (req, res) => {
  const accessToken = await getUserAccessToken(req);
  const userId = JwtService.verifyToken(accessToken);
  const dbUser = await UserRepository.getUser(userId, UserReturn);
  if (!dbUser) throw new NotFound('User not found.');
  await UserRepository.updateSignedOut(userId);

  return res.status(OK).send({ message: 'User signed out.' });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserRepository.getAll();

  return res.status(OK).send({ users });
});

export default { register, login, getMe, logOutUser, getAllUsers };
