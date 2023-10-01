import express from 'express';
import validate from '../../core/middlewares/validator';
import authValidation from '../../validations/auth.validation';
import authController from '../../controllers/auth.controller';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout');
router.get('/me', validate(authValidation.getMe), authController.getMe);
router.post('/refresh-tokens');

export default router;
