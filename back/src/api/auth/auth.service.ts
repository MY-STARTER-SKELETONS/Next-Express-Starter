import { AppError } from '../../errors/app-error.js';
import { authRepository } from './auth.repository.js';

export const authService = {
  async login(email: string, password: string): Promise<{ userId: string }> {
    const user = await authRepository.findByEmail(email);
    if (!user || user.passwordPlain !== password) {
      throw new AppError(401, 'invalid_credentials');
    }
    return { userId: user.id };
  },

  async requireSessionUserId(sessionId: string | undefined): Promise<string> {
    if (!sessionId) {
      throw new AppError(401, 'unauthorized');
    }
    const user = await authRepository.findById(sessionId);
    if (!user) {
      throw new AppError(401, 'unauthorized');
    }
    return user.id;
  },
};
