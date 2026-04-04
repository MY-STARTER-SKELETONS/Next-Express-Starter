import { z } from 'zod';
import { booleanString } from './boolean-string.js';
import { corsOriginSchema } from './cors-origin.js';
import { maxAgeMsSchema } from './max-age-ms.js';
import { nodeEnvSchema } from './node-env.js';
import { portSchema } from './port.js';
import { sameSiteSchema } from './same-site.js';
import { secureCookieSchema } from './secure-cookie.js';

const rawEnvSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
  COOKIE_SECRET: z.string().optional(),
  COOKIE_HTTP_ONLY: z.string().optional(),
  COOKIE_SAME_SITE: z.string().optional(),
  COOKIE_SECURE: z.string().optional(),
  COOKIE_PATH: z.string().optional(),
  COOKIE_MAX_AGE_MS: z.string().optional(),
});

export const envSchema = rawEnvSchema.transform((raw) => {
  const nodeEnv = nodeEnvSchema.parse(raw.NODE_ENV);
  const isProduction = nodeEnv === 'production';

  return {
    nodeEnv,
    isProduction,
    port: portSchema.parse(raw.PORT),
    corsOrigin: corsOriginSchema.parse(raw.CORS_ORIGIN),
    cookieSecret: raw.COOKIE_SECRET?.trim() || undefined,
    cookieHttpOnly: booleanString(true).parse(raw.COOKIE_HTTP_ONLY),
    cookieSameSite: sameSiteSchema.parse(raw.COOKIE_SAME_SITE),
    cookieSecure: secureCookieSchema(isProduction).parse(raw.COOKIE_SECURE),
    cookiePath: raw.COOKIE_PATH?.trim() || '/',
    cookieMaxAgeMs: maxAgeMsSchema.parse(raw.COOKIE_MAX_AGE_MS),
  };
});

export type Env = z.infer<typeof envSchema>;
