import prisma from '../core/prisma/client';
import { User, UserBasicReturn } from '../types/user';

const createUser = async (username: string, email: string, password: string): Promise<User> => {
  return (await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  })) as unknown as Promise<User>;
};

const getUser = async (id: number, returnKeys: object = UserBasicReturn): Promise<User | null> => {
  return (await prisma.user.findUnique({
    select: returnKeys,
    where: {
      id,
    },
  })) as Promise<User | null>;
};

const getUserByEmail = async (
  email: string,
  returnKeys: object = UserBasicReturn,
): Promise<User | null> => {
  return (await prisma.user.findUnique({
    select: returnKeys,
    where: {
      email,
    },
  })) as Promise<User | null>;
};

const getUserByEmailAndId = async (
  email: string,
  userId: number,
  returnKeys: object = UserBasicReturn,
): Promise<User | null> => {
  return (await prisma.user.findUnique({
    select: returnKeys,
    where: {
      email,
      id: userId,
    },
  })) as Promise<User | null>;
};

const getUserByUsername = async (
  username: string,
  returnKeys: object = UserBasicReturn,
): Promise<User | null> => {
  return (await prisma.user.findUnique({
    select: returnKeys,
    where: {
      username,
    },
  })) as Promise<User | null>;
};

export default { createUser, getUser, getUserByEmail, getUserByEmailAndId, getUserByUsername };
