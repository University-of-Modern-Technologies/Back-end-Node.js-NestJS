import { UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function apiKey(req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-api-key'] !== 'secret') {
    throw new UnauthorizedException('Потрібен заголовок x-api-key');
  }
  next();
}
