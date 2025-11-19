import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import * as authService from '../services/authService';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    return res.status(400).json({
      success: false,
      message: 'Email or username is required',
    });
  }

  const admin = await authService.validateAdminCredentials({
    email,
    username,
    password,
  });

  const token = authService.generateToken(admin.email, admin.username);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      admin: {
        email: admin.email,
        username: admin.username,
      },
    },
  });
});






