import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { createError } from '../middleware/errorHandler';

interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

interface TokenPayload {
  email: string;
  username: string;
  role: 'admin';
}

let hashedAdminPassword: string | null = null;

const getHashedAdminPassword = async (): Promise<string> => {
  if (!hashedAdminPassword) {
    const saltRounds = 10;
    hashedAdminPassword = await bcrypt.hash(env.ADMIN_PASSWORD, saltRounds);
  }
  return hashedAdminPassword;
};

export const validateAdminCredentials = async (
  credentials: LoginCredentials
): Promise<{ email: string; username: string }> => {
  const { email, username, password } = credentials;

  if (!password) {
    throw createError('Password is required', 400);
  }

  let isValid = false;
  let adminEmail = '';
  let adminUsername = '';

  const hashedPassword = await getHashedAdminPassword();

  if (email) {
    if (email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase()) {
      isValid = await bcrypt.compare(password, hashedPassword);
      if (isValid) {
        adminEmail = env.ADMIN_EMAIL;
        adminUsername = env.ADMIN_USERNAME;
      }
    }
  } else if (username) {
    if (username.toLowerCase() === env.ADMIN_USERNAME.toLowerCase()) {
      isValid = await bcrypt.compare(password, hashedPassword);
      if (isValid) {
        adminEmail = env.ADMIN_EMAIL;
        adminUsername = env.ADMIN_USERNAME;
      }
    }
  }

  if (!isValid) {
    throw createError('Invalid credentials', 401);
  }

  return { email: adminEmail, username: adminUsername };
};

export const generateToken = (email: string, username: string): string => {
  const payload: TokenPayload = {
    email,
    username,
    role: 'admin',
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw createError('Invalid or expired token', 401);
  }
};






