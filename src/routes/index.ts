import { Router } from 'express';
import { v1Router } from './v1';
import { logsRouter } from './logs/logs.route';

const mainRouter = Router();

mainRouter.use('/v1', v1Router);

mainRouter.use('/logs', logsRouter);

export { mainRouter };
