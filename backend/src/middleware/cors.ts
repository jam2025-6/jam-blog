import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // 允许所有源访问，解决跨域问题
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
};