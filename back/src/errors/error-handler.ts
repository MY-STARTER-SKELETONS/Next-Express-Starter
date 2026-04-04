import type { ErrorRequestHandler } from 'express';
import { AppError } from './app-error.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }
  if (err instanceof AppError) {
    const body: Record<string, unknown> = { error: err.code };
    if (err.details !== undefined) {
      body.details = err.details;
    }
    res.status(err.statusCode).json(body);
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
};
