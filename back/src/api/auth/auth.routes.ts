import { Router } from 'express';
import { wrapAsync } from '../../middleware/wrap-async.js';
import { authController } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/login', wrapAsync(authController.login));
authRouter.get('/me', wrapAsync(authController.me));
