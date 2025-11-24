import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Puedes personalizar el status y el formato según tus necesidades
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    status: 'error',
    message,
  });
}
