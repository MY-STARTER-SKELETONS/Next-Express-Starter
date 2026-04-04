import type { Request, Response } from 'express';
import { defaultCookieOptions } from '../../config/cookies.js';
import { authService } from './auth.service.js';
import { loginBodySchema } from './auth.schemas.js';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    const parsed = loginBodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'validation_error',
        details: parsed.error.flatten(),
      });
      return;
    }

    const { userId } = await authService.login(
      parsed.data.email,
      parsed.data.password,
    );

    res.cookie('sid', userId, defaultCookieOptions);
    res.json({ userId });
  },

  async me(req: Request, res: Response): Promise<void> {
    const userId = await authService.requireSessionUserId(req.cookies?.sid);
    res.json({ userId });
  },
};
