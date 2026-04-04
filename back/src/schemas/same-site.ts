import type { CookieOptions } from 'express';
import { z } from 'zod';

export const sameSiteSchema: z.ZodType<
  NonNullable<CookieOptions['sameSite']>
> = z
  .string()
  .optional()
  .transform((s) => {
    const v = s?.trim().toLowerCase();
    if (v === 'strict' || v === 'none' || v === 'lax') {
      return v;
    }
    return 'lax' as const;
  });
