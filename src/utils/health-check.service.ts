import { CronJob } from 'cron';
import https from 'https';
import { HealthCheckConfig } from '../types/qr.types';
import { logger } from './logger';

export class HealthCheckService {
  private job: CronJob;
  private apiUrl: string;
  constructor(config: HealthCheckConfig) {
    this.apiUrl = config.apiUrl;
    this.job = new CronJob(config.schedule, this.executeHealthCheck.bind(this), null, false, 'UTC');
  }

  private executeHealthCheck(): void {
    const options = {
      method: 'GET',
      timeout: 5000,
    };

    const request = https.get(this.apiUrl, options, (res) => {
      if (res.statusCode === 200) {
        logger.info(`Health check successful at ${new Date().toISOString()}`);
      } else {
        logger.error(`Health check failed with status: ${res.statusCode}`);
      }
    });

    request.on('error', (error: Error) => {
      logger.error(`Health check request failed: ${error.message}`);
    });

    request.on('timeout', () => {
      request.destroy();
      logger.error('Health check request timed out after 5 seconds');
    });
  }
  public start(): void {
    if (process.env.NODE_ENV === 'production') {
      this.job.start();
      logger.info(`Health check cron job started with schedule: ${this.job.cronTime.source}`);
    } else {
      logger.info('Health check cron job not started: only runs in production mode');
    }
  }

  public stop(): void {
    this.job.stop();
    logger.info('Health check cron job stopped');
  }
}
