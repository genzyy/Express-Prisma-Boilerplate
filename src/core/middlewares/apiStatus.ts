import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { ApiStatus } from '../../types/apiMetadata';
import { ApiUnavailable } from '../../utils/ApiError';

export const ValidateApiMetadata = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (async () => {
    if (config.api.status === ApiStatus.Maintenance) throw new ApiUnavailable();
  })()
    .then(() => next())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((error) => next(new ApiUnavailable()));
};
