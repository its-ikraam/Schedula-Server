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
});

const validateEnv = (): z.infer<typeof ConfigSchema> => {
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
  });
};

export const config = validateEnv();
