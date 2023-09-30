import { PrismaClient } from '@prisma/client';
import config from '../config';

interface ProjectGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: ProjectGlobal;

const prisma = global.prisma || new PrismaClient();

if (config.environment === 'development') global.prisma = prisma;

export default prisma;
