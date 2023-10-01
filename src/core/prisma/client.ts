import { PrismaClient } from '@prisma/client';
import config from '../config';
import logger from '../logger';

interface ProjectGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: ProjectGlobal;

const prisma = global.prisma || new PrismaClient();

if (config.logging.showSqlQueries) {
  prisma.$use(async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    logger.info(`\n${params.model}.${params.action} took ${after - before}ms`);

    return result;
  });
}

if (config.environment === 'development') global.prisma = prisma;

export default prisma;
