import type { NextFunction, Request, RequestHandler, Response } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;

export function wrapAsync(handler: AsyncRequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
