import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

export const rateLimitMiddleware = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.',
  },
});
