import { z } from 'zod';
import { paginationQuerySchema } from '../../schemas/api/pagination.js';

export const listExamplesQuerySchema = paginationQuerySchema;

export const exampleIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const createExampleBodySchema = z.object({
  title: z.string().min(1).max(200),
});

export type CreateExampleBody = z.infer<typeof createExampleBodySchema>;
