import winston from 'winston';
import 'winston-daily-rotate-file';
import colors from 'colors';

colors.enable();

const customFormat = winston.format.printf(({ level, message, timestamp }): string => {
  let coloredLevel = level;
  switch (level) {
    case 'error':
      coloredLevel = colors.red(level);
      break;
    case 'warn':
      coloredLevel = colors.yellow(level);
      break;
    case 'info':
      coloredLevel = colors.green(level);
      break;
    case 'debug':
      coloredLevel = colors.blue(level);
      break;
  }
  return `[${colors.gray(String(timestamp))}] ${coloredLevel}: ${message}`;
});

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  customFormat
);

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});
