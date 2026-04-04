import { z } from "zod";

const defaultPort = 4000;

export const portSchema = z
  .string()
  .optional()
  .transform((s) => {
    if (!s?.trim()) {
      return defaultPort;
    }
    const n = Number.parseInt(s.trim(), 10);
    if (!Number.isFinite(n) || n <= 0) {
      return defaultPort;
    }
    return n;
  });
