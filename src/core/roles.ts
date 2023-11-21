import { Role } from '../types/user';

const Roles = {
  [Role.User]: [],
  [Role.Datamanager]: ['getUsers'],
  [Role.Superadmin]: ['getUsers', 'manageUsers', 'deleteNotes'],
};

export const roles = Object.keys(Roles);
export const roleActions = new Map(Object.entries(roles));
