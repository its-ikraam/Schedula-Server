import { z } from 'zod';

export const QRCodeRequestSchema = z.object({
  qrId: z.string().min(1),
  qrCode: z.string().min(1),
  userId: z.string().min(1),
});

export type QRCodeRequest = z.infer<typeof QRCodeRequestSchema>;

export interface QRCodeResponse {
  status: 'success' | 'error';
  message?: string;
  path?: string;
  publicUrl?: string;
  error?: string;
  details?: string;
}

export interface HealthCheckConfig {
  schedule: string;
  apiUrl: string;
}
