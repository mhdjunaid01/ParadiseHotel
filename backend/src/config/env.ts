import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI'] as const;

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value && requiredEnvVars.includes(key as any)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
};

export const env = {
  MONGODB_URI: getEnvVar('MONGODB_URI'),
  PORT: parseInt(getEnvVar('PORT', '5000'), 10),
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  FRONTEND_URL: getEnvVar('FRONTEND_URL', 'http://localhost:3000'),
  ADMIN_EMAIL: getEnvVar('ADMIN_EMAIL', 'admin@gmail.com'),
  ADMIN_USERNAME: getEnvVar('ADMIN_USERNAME', 'admin'),
  ADMIN_PASSWORD: getEnvVar('ADMIN_PASSWORD', 'admin123'),
  JWT_SECRET: getEnvVar('JWT_SECRET', 'your-secret-key-change-in-production'),
  JWT_EXPIRES_IN: getEnvVar('JWT_EXPIRES_IN', '24h'),
} as const;
