import type { CookieOptions } from 'express';
import { env } from './env.js';

/** Used by `cookie-parser` for signed cookies. */
export const cookieParserSecret: string | undefined = env.cookieSecret;

/** Defaults for `res.cookie()` — from env (see `.env.example`). */
export const defaultCookieOptions: CookieOptions = {
  httpOnly: env.cookieHttpOnly,
  sameSite: env.cookieSameSite,
  secure: env.cookieSecure,
  path: env.cookiePath,
  maxAge: env.cookieMaxAgeMs,
};
