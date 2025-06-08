import { config } from '../config/config';

export const testConfig = {
  ...config,
  jwt: {
    secret: 'test-secret-key',
    expiresIn: '1h',
  },
  port: '3001',
  nodeEnv: 'test' as const,
};
