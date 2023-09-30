import { CREATED, OK } from 'http-status';
import { Request, Response } from 'express';
import userRepository from '../repositories/user';
import { UserReturn } from '../types/user';

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const user = await userRepository.createUser(username, email, password);
  return res.status(CREATED).send({ user });
};

const getMe = async (req: any, res: Response) => {
  const { currentUserId } = req;
  const user = await userRepository.getUser(currentUserId, UserReturn);
  return res.status(OK).send({ user });
};

export default { register, getMe };
