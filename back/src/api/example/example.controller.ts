import type { Request, Response } from 'express';
import {
  createExampleBodySchema,
  exampleIdParamSchema,
  listExamplesQuerySchema,
} from './example.schemas.js';
import { exampleService } from './example.service.js';

export const exampleController = {
  async list(req: Request, res: Response): Promise<void> {
    const parsed = listExamplesQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        error: 'validation_error',
        details: parsed.error.flatten(),
      });
      return;
    }
    const { page, limit } = parsed.data;
    res.json(await exampleService.listPaged(page, limit));
  },

  async getById(req: Request, res: Response): Promise<void> {
    const parsed = exampleIdParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({
        error: 'validation_error',
        details: parsed.error.flatten(),
      });
      return;
    }
    res.json(await exampleService.getById(parsed.data.id));
  },

  async create(req: Request, res: Response): Promise<void> {
    const parsed = createExampleBodySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: 'validation_error',
        details: parsed.error.flatten(),
      });
      return;
    }
    const row = await exampleService.create(parsed.data.title);
    res.status(201).json(row);
  },
};
