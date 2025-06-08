import request from 'supertest';
import { app } from '../../src/app';
import jwt from 'jsonwebtoken';
import { config } from '../../src/config/config';

describe('QR Routes', () => {
  const validToken = jwt.sign({ userId: 'test-user', role: 'user' }, config.jwt.secret);

  describe('POST /api/qr/generate', () => {
    it('should require authentication', async () => {
      const response = await request(app).post('/api/qr/generate').send({
        qrId: 'test-id',
        qrCode: 'test-code',
        userId: 'test-user',
      });

      expect(response.status).toBe(401);
    });

    it('should generate QR code with valid token', async () => {
      const response = await request(app)
        .post('/api/qr/generate')
        .set('Authorization', `Bearer ${validToken}`)
        .send({
          qrId: 'test-id',
          qrCode: 'test-code',
          userId: 'test-user',
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
    });
  });
});
