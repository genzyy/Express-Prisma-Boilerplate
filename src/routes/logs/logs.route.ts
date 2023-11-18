import express from 'express';
import { OK } from 'http-status';

const logsRouter = express.Router();

logsRouter.get('/health', (req, res) => {
  return res.status(OK).json({ status: 'API healthy' });
});

export { logsRouter };
