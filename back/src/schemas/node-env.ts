import { z } from 'zod';

export const nodeEnvSchema = z
  .string()
  .optional()
  .transform((s) =>
    s === 'production' || s === 'test' ? s : ('development' as const),
  );
