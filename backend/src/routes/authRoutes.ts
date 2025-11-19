import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate, loginSchema } from '../middleware/validation';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);

export default router;






