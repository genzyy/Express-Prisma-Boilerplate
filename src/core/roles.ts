import { Role } from '@prisma/client';

const Roles = {
  [Role.USER]: [],
  [Role.DATAMANAGER]: ['getUsers'],
  [Role.SUPERADMIN]: ['getUsers', 'manageUsers', 'deleteNotes'],
};

export const roles = Object.keys(Roles);
export const roleActions = new Map(Object.entries(roles));
