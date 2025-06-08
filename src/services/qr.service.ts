import QRCode from 'qrcode';
import { supabaseClient } from './supabase.service';
import { config } from '../config/config';
import { QRCodeRequest, QRCodeResponse } from '../types/qr.types';
import { logger } from '../utils/logger';

export class QRService {
  public static async generateAndUploadQR(params: QRCodeRequest): Promise<QRCodeResponse> {
    try {
      const { qrId, qrCode, userId } = params;
      const qrData = JSON.stringify({ qrId, qrCode });
      
      const qrBuffer = await QRCode.toBuffer(qrData, {
        type: 'png',
        errorCorrectionLevel: 'H',
      });

      const fileName = `${userId}/${qrId}.png`;

      if (!config.supabase.storageBucket) {
        throw new Error('Storage bucket configuration is missing');
      }

      const { error } = await supabaseClient.storage
        .from(config.supabase.storageBucket)
        .upload(fileName, qrBuffer, {
          contentType: 'image/png',
          upsert: true,
        });

      if (error) {
        logger.error('QR upload failed:', error);
        return {
          status: 'error',
          error: 'Upload failed',
          details: error.message,
        };
      }

      const { data: urlData } = supabaseClient.storage
        .from(config.supabase.storageBucket)
        .getPublicUrl(fileName);

      return {
        status: 'success',
        message: 'QR code uploaded successfully',
        publicUrl: urlData.publicUrl,
      };
    } catch (err) {
      const error = err as Error;
      logger.error('QR generation error:', error);
      return {
        status: 'error',
        error: 'QR generation failed',
        details: error.message,
      };
    }
  }
}
