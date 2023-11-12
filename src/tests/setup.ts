import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import supertest from 'supertest';

import app from '../app';

dotenv.config({ path: '.env.test', override: true });

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
  dotenv.config({ path: '.env', override: true });
});

export const client = supertest(app);
