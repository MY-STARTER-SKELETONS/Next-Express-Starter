import type { CorsOptions } from 'cors';
import { z } from 'zod';

const defaultOrigin = 'http://localhost:3000';

export const corsOriginSchema: z.ZodType<CorsOptions['origin']> = z
  .string()
  .optional()
  .transform((value): CorsOptions['origin'] => {
    if (!value || value.trim() === '') {
      return defaultOrigin;
    }
    const parts = value.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length === 1) {
      return parts[0]!;
    }
    return parts;
  });
