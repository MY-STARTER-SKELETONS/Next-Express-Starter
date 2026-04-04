import { z } from 'zod';

/** Example shared query schema for list endpoints. */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
