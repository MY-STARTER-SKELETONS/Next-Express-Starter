export class AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details: unknown | undefined;

  constructor(statusCode: number, code: string, details?: unknown) {
    super(code);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
