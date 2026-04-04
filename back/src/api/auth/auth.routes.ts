import { Router } from 'express';
import { authController } from './auth.controller.js';

export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  authController.login(req, res);
});
authRouter.get('/me', (req, res) => {
  authController.me(req, res);
});
