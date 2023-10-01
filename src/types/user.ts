import { User as UserModel } from '@prisma/client';
import Joi from 'joi';
import include from '../utils/include';

export type Key = keyof UserModel;

export type User = Pick<UserModel, Key>;

export type UserUuid = {
  uuid: string;
};

export const UserKeys: string[] = [
  'id',
  'uuid',
  'email',
  'password',
  'username',
  'role',
  'name',
  'age',
  'phone',
  'created',
  'updated',
  'signedOut',
] as Key[];

export const UserBasicReturn = include<UserModel, Key>(['username', 'email']);

export const UserReturn = include<UserModel, Key>([
  'uuid',
  'username',
  'email',
  'name',
  'age',
  'phone',
  'created',
]);

export const UserReturnWithPassword = include<UserModel, Key>([
  'password',
  ...(Object.keys(UserBasicReturn) as Key[]),
]);

export const UReturn = Joi.object().keys({
  username: Joi.string().required(),
});
