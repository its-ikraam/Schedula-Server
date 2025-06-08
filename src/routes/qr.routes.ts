import { Router } from 'express';
import { QRController } from '../controllers/qr.controller';

const router = Router();

router.get('/health', QRController.health);
router.post('/qr/generate', QRController.generateQR);

export const qrRoutes = router;
