import { z } from 'zod';

/** Parses typical env truthy/falsey strings; empty → `defaultValue`. */
export function booleanString(defaultValue: boolean) {
  return z
    .string()
    .optional()
    .transform((s) => {
      if (s === undefined || s.trim() === '') {
        return defaultValue;
      }
      const v = s.trim().toLowerCase();
      if (v === 'true' || v === '1' || v === 'yes') {
        return true;
      }
      if (v === 'false' || v === '0' || v === 'no') {
        return false;
      }
      return defaultValue;
    });
}
