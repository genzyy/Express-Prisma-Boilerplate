import { User as UserModel } from '@prisma/client';
import include from '../utils/include';

export type Key = keyof UserModel;

export type User = Pick<UserModel, Key>;

export const UserBasicReturn = include<UserModel, Key>(['username', 'email', 'name']);

export const UserReturn = include<UserModel, Key>([
  'uuid',
  'username',
  'email',
  'name',
  'age',
  'phone',
  'created',
]);
