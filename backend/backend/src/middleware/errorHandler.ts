import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  error?: any;
  stack?: string;
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error occurred:', err);

  const statusCode = err.statusCode || 500;
  const errorResponse: ErrorResponse = {
    message: err.message || 'Internal Server Error'
  };

  // 开发环境下返回详细错误信息
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error = err;
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;