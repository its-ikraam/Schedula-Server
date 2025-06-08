import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const ConfigSchema = z.object({
  port: z.string().default('3000'),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  supabase: z.object({
    url: z.string(),
    anonKey: z.string(),
    storageBucket: z.string(),
  }),
  healthCheck: z.object({
    apiUrl: z.string(),
    schedule: z.string().default('*/14 * * * *'),
  }),
  jwt: z.object({
    secret: z.string(),
    expiresIn: z.string().default('24h'),
  }),
  rateLimit: z.object({
    windowMs: z.number().default(15 * 60 * 1000), // 15 minutes
    max: z.number().default(100), // Limit each IP to 100 requests per windowMs
  }),
});

const validateEnv = () => {
  return ConfigSchema.parse({
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      storageBucket: process.env.SUPABASE_STORAGE_BUCKET_QR,
    },
    healthCheck: {
      apiUrl: process.env.API_URL,
      schedule: process.env.HEALTH_CHECK_SCHEDULE,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    rateLimit: {
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
    },
  });
};

export const config = validateEnv();
