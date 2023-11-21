import express from 'express';
import validate from '../../core/middlewares/validator';
import authValidation from '../../validations/auth.validation';
import { AuthController } from '../../controllers/';
import auth from '../../core/middlewares/auth';
import { Role } from '../../types/user';

const router = express.Router();

router.post('/register', validate(authValidation.register), AuthController.register);
router.post('/login', validate(authValidation.login), AuthController.login);
router.route('/logout').post(auth(), AuthController.logOutUser);
router.route('/me').get(auth(), validate(authValidation.getMe), AuthController.getMe);
router.route('/').get(auth(Role.Superadmin), AuthController.getAllUsers);
router.route('/refresh-tokens').post(auth());

export default router;
