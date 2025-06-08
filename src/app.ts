import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { qrRoutes } from './routes/qr.routes';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Apply rate limiting to all routes
app.use(rateLimitMiddleware);

// API routes
app.use('/api', qrRoutes);

// Error handling middleware should be last
app.use(errorHandler);

export { app };
