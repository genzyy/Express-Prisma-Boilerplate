import { User as UserModel } from '@prisma/client';
import Joi from 'joi';
import { include } from '../utils';

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
  'activityStatus',
  'name',
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
  'created',
  'password',
  'signedOut',
]);

export const UserReturnWithPassword = include<UserModel, Key>([
  'password',
  ...(Object.keys(UserBasicReturn) as Key[]),
]);

export const UReturn = Joi.object().keys({
  username: Joi.string().required(),
});

export enum UserActivityStatus {
  Active = 'active',
  UnderSupervision = 'under supervision',
  Blocked = 'blocked',
}

export enum Role {
  User = 'user',
  Superadmin = 'superadmin',
  Datamanager = 'datamanager',
}
