import { app } from './app';
import { config } from './config/config';
import { HealthCheckService } from './utils/health-check.service';
import { logger } from './utils/logger';

// Initialize health check service
const healthCheck = new HealthCheckService({
  schedule: config.healthCheck.schedule,
  apiUrl: config.healthCheck.apiUrl,
});

healthCheck.start();

// Start server
const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received');
  healthCheck.stop();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});
