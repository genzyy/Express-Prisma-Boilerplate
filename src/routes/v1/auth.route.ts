import express from 'express';
import validate from '../../core/middlewares/validator';
import authValidation from '../../validations/auth.validation';
import authController from '../../controllers/auth.controller';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login');
router.post('/logout');
router.patch('/me');
router.post('/refresh-tokens');

export default router;
