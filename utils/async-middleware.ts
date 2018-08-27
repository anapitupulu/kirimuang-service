import { Router, Request, Response } from 'express';

export const asyncMiddleware = (fn: Function) =>
  (req: Request, res: Response, next: (reason: any) => void) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
