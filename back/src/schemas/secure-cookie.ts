import { z } from 'zod';

export function secureCookieSchema(isProduction: boolean) {
  return z
    .string()
    .optional()
    .transform((raw) => {
      const r = raw?.trim().toLowerCase();
      if (r === 'true' || r === '1' || r === 'yes') {
        return true;
      }
      if (r === 'false' || r === '0' || r === 'no') {
        return false;
      }
      return isProduction;
    });
}
