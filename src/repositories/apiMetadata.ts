import prisma from '../core/prisma/client';
import { ApiMetadatReturn, ApiMetadata } from '../types/apiMetadata';

const createApiMetadata = async (
  key: string,
  value: string,
  authoredById: number,
): Promise<ApiMetadata> => {
  return (await prisma.apiMetadata.create({
    data: {
      key,
      value,
      authoredById,
    },
  })) as unknown as Promise<ApiMetadata>;
};

const getApiMetadata = async (
  key: string,
  returnKeys: object = ApiMetadatReturn,
): Promise<ApiMetadata | null> => {
  return (await prisma.apiMetadata.findUnique({
    select: returnKeys,
    where: {
      key,
    },
  })) as Promise<ApiMetadata>;
};

export default {
  createApiMetadata,
  getApiMetadata,
};
