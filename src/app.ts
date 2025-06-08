import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { qrRoutes } from './routes/qr.routes';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', qrRoutes);

// Not found handler - should be after all valid routes
app.use(notFoundHandler);

// Error handling middleware should be last
app.use(errorHandler);

export { app };
