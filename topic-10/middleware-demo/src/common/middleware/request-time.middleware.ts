import { NextFunction, Request, Response } from 'express';

export function requestTime(req: Request, res: Response, next: NextFunction) {
  console.log(`час запиту: ${new Date().toLocaleTimeString('uk-UA')}`);
  next();
}
