import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from './asyncHandler';
import * as authService from '../services/authService';
import { createError } from './errorHandler';

export interface AuthRequest extends Request {
  admin?: {
    email: string;
    username: string;
    role: 'admin';
  };
}

export const authenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('No token provided', 401);
    }

    const token = authHeader.substring(7);

    try {
      const decoded = authService.verifyToken(token);
      req.admin = decoded;
      next();
    } catch (error) {
      throw createError('Invalid or expired token', 401);
    }
  }
);






