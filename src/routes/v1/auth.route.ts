import express from 'express';
import validate from '../../core/middlewares/validator';
import authValidation from '../../validations/auth.validation';
import { AuthController } from '../../controllers/';

const router = express.Router();

router.post('/register', validate(authValidation.register), AuthController.register);
router.post('/login', validate(authValidation.login), AuthController.login);
router.post('/logout', AuthController.logOutUser);
router.get('/me', validate(authValidation.getMe), AuthController.getMe);
router.post('/refresh-tokens');

export default router;
