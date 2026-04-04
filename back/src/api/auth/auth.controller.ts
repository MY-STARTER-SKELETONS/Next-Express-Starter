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

    const result = await authService.login(
      parsed.data.email,
      parsed.data.password,
    );
    if (!result.ok) {
      res.status(401).json({ error: result.reason });
      return;
    }

    res.cookie('sid', result.userId, defaultCookieOptions);
    res.json({ userId: result.userId });
  },

  async me(req: Request, res: Response): Promise<void> {
    const userId = await authService.getSessionUserId(req.cookies?.sid);
    if (!userId) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }
    res.json({ userId });
  },
};
