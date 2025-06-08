import { QRService } from '../../services/qr.service';
import { QRCodeRequest } from '../../types/qr.types';

describe('QRService', () => {
  const mockRequest: QRCodeRequest = {
    qrId: 'test-id',
    qrCode: 'test-code',
    userId: 'test-user',
  };

  describe('generateAndUploadQR', () => {
    it('should generate and upload QR code successfully', async () => {
      const result = await QRService.generateAndUploadQR(mockRequest);

      expect(result.status).toBe('success');
      expect(result.publicUrl).toBeDefined();
    });

    it('should handle invalid input', async () => {
      const invalidRequest = {
        ...mockRequest,
        qrId: '',
      };

      const result = await QRService.generateAndUploadQR(invalidRequest as QRCodeRequest);

      expect(result.status).toBe('error');
      expect(result.error).toBe('Missing required fields');
    });
  });
});
