import { authRepository } from './auth.repository.js';

export type LoginResult =
  | { ok: true; userId: string }
  | { ok: false; reason: 'invalid_credentials' };

export const authService = {
  async login(email: string, password: string): Promise<LoginResult> {
    const user = await authRepository.findByEmail(email);
    if (!user || user.passwordPlain !== password) {
      return { ok: false, reason: 'invalid_credentials' };
    }
    return { ok: true, userId: user.id };
  },

  async getSessionUserId(
    sessionId: string | undefined,
  ): Promise<string | undefined> {
    if (!sessionId) {
      return undefined;
    }
    const user = await authRepository.findById(sessionId);
    return user?.id;
  },
};
