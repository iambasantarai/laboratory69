import path from 'node:path';
import fs from 'node:fs';
import { createLogger, transports, format } from 'winston';
import { logConfig } from './env.util';
const { combine, timestamp, printf, errors } = format;

const logDir = logConfig.dir;

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
    printf(({ level, message, timestamp, stack }) => {
      const text = `${timestamp} [${level.toUpperCase()}]: ${message}`;
      return stack ? text + '\n' + stack : text;
    }),
    errors({ stack: true })
  ),

  transports: [
    new transports.Console(),

    new transports.File({
      filename: path.join(logDir, logConfig.server.logFileName ?? 'server.log'),
      level: logConfig.server.level ?? 'info'
    }),

    new transports.File({
      filename: path.join(
        logDir,
        logConfig.server.errorFileName ?? 'server-error.log'
      ),
      level: 'error' // Log only errors to this file
    })
  ],

  exceptionHandlers: [
    new transports.File({
      filename: path.join(
        logDir,
        logConfig.server.errorFileName ?? 'server-error.log'
      )
    })
  ],

  rejectionHandlers: [
    new transports.File({
      filename: path.join(
        logDir,
        logConfig.server.errorFileName ?? 'server-error.log'
      )
    })
  ]
});

export default logger;
