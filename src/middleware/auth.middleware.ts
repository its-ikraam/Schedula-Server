import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ status: 'error', message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret) as {
      userId: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication failed:', error);
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};
