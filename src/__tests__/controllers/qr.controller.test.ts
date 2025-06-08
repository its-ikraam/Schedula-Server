import { Request, Response } from 'express';
import { QRController } from '../../controllers/qr.controller';
import { QRService } from '../../services/qr.service';

jest.mock('../../services/qr.service');

describe('QRController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {
        qrId: 'test-id',
        qrCode: 'test-code',
        userId: 'test-user',
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('generateQR', () => {
    it('should handle successful QR generation', async () => {
      const mockResult = {
        status: 'success',
        publicUrl: 'http://example.com/qr.png',
      };

      (QRService.generateAndUploadQR as jest.Mock).mockResolvedValue(mockResult);

      await QRController.generateQR(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });
  });
});
