import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  error?: any;
  stack?: string;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const response: ErrorResponse = {
    message: err.message || 'Server Error',
  };

  // Include error details in development
  if (process.env.NODE_ENV === 'development') {
    response.error = err;
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};