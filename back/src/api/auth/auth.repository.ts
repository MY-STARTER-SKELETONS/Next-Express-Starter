import { prisma } from '../../db/prisma.js';

export type UserRecord = {
  id: string;
  email: string;
  /** Demo only — use a password hash in production. */
  passwordPlain: string;
};

export const authRepository = {
  async findByEmail(email: string): Promise<UserRecord | undefined> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user ?? undefined;
  },

  async findById(id: string): Promise<UserRecord | undefined> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ?? undefined;
  },
};
