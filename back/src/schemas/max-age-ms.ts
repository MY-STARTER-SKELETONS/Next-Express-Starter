import { z } from 'zod';

const defaultMaxAgeMs = 7 * 24 * 60 * 60 * 1000;

export const maxAgeMsSchema = z
  .string()
  .optional()
  .transform((raw) => {
    if (!raw?.trim()) {
      return defaultMaxAgeMs;
    }
    const n = Number.parseInt(raw.trim(), 10);
    if (!Number.isFinite(n) || n < 0) {
      return defaultMaxAgeMs;
    }
    return n;
  });
