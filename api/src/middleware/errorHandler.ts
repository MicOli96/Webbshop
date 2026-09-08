import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { ZodError } from 'zod';

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function errorHandler(error: unknown, c: Context) {
  if (error instanceof ZodError) {
    return c.json({ error: 'Valideringsfel', details: error.flatten().fieldErrors }, 400);
  }
  if (error instanceof HttpError) {
    return c.json({ error: error.message }, error.status as ContentfulStatusCode);
  }
  console.error(error);
  return c.json({ error: 'Internt serverfel' }, 500);
}
