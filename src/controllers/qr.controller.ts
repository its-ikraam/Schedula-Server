import { Request, Response } from 'express';
import { QRService } from '../services/qr.service';
import { QRCodeRequestSchema } from '../types/qr.types';
import { logger } from '../utils/logger';

export class QRController {
  public static async generateQR(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = QRCodeRequestSchema.parse(req.body);
      const result = await QRService.generateAndUploadQR(validatedData);

      if (result.status === 'error') {
        res.status(500).json(result);
        return;
      }

      res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      logger.error('QR generation request failed:', error);
      res.status(400).json({
        status: 'error',
        error: 'Invalid request data',
        details: error.message,
      });
    }
  }

  public static health(_req: Request, res: Response): void {
    res.status(200).json({ status: 'ok' });
  }
}
