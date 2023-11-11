import { ApiMetadata as ApiMetadataModel } from '@prisma/client';
import include from '../utils/include';

export type Key = keyof ApiMetadataModel;

export type ApiMetadata = Pick<ApiMetadataModel, Key>;

export const ApiMetadatReturn = include<ApiMetadataModel, Key>([
  'key',
  'value',
  'created',
  'updated',
]);

export enum ApiStatus {
  Live = 'live',
  Maintenance = 'maintenance',
}
