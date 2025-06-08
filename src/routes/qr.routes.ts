import { Router } from 'express';
import { QRController } from '../controllers/qr.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { rateLimitMiddleware } from '../middleware/rate-limit.middleware';

const router = Router();

// Public routes
router.get('/health', QRController.health);

// Protected routes
router.post('/qr/generate', rateLimitMiddleware, authMiddleware, QRController.generateQR);

export const qrRoutes = router;
