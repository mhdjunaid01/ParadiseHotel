import express, { Express } from 'express';
import { connectDatabase } from './config/database';
import bookingRoutes from './routes/bookingRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';
import { securityMiddleware, corsMiddleware, rateLimiter, sanitizeInput } from './middleware/security';
import './config/env';

const app: Express = express();

app.use(securityMiddleware);
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/bookings') && req.method === 'POST') {
      console.log('📥 Incoming booking request:', JSON.stringify(req.body, null, 2));
    }
    next();
  });
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Resort Booking API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(errorHandler);

export { app };






