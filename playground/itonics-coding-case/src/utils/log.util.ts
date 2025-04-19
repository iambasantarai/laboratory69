import path from 'node:path';
import fs from 'node:fs';
import { createLogger, transports, format } from 'winston';
import { logConfig } from './env.util';
const { combine, colorize, timestamp, printf, errors } = format;

const logDir = logConfig.dir;

// Create the log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2
  },
  colors: {
    error: 'bold red',
    warn: 'bold yellow',
    info: 'bold green'
  }
};

// Format for file transports (JSON)
const logFormatForFile = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json(),
  printf(({ level, message, timestamp }) => {
    return JSON.stringify({
      timestamp,
      leve: level.toUpperCase(),
      message
    });
  }),
  errors({ stack: true })
);

// Configure custom colors to winston logger
format.colorize().addColors(logLevels.colors);

const logFormatForConsole = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp, stack }) => {
    const prefix = `${timestamp} [${level}]`;
    const formattedMessage = stack ? `${message}\n${stack}` : message;
    return `${prefix}: ${formattedMessage}`;
  })
);

const logger = createLogger({
  level: logConfig.server.level ?? 'info',
  levels: logLevels.levels,
  transports: [
    new transports.Console({
      format: logFormatForConsole
    }),

    // TODO: Implement daily rotating log transports with 'winston-daily-rotate-file'

    // Transports for all possible levels
    new transports.File({
      format: logFormatForFile,
      filename: path.join(logDir, logConfig.server.logFileName ?? 'server.log'),
      level: logConfig.server.level ?? 'info'
    }),

    // Transports for errors only
    new transports.File({
      format: logFormatForFile,
      filename: path.join(
        logDir,
        logConfig.server.errorFileName ?? 'server-error.log'
      ),
      level: 'error' // Log only errors to this file
    })
  ],

  exceptionHandlers: [
    new transports.File({
      format: logFormatForFile,
      filename: path.join(
        logDir,
        logConfig.server.errorFileName ?? 'server-error.log'
      )
    })
  ],

  rejectionHandlers: [
    new transports.File({
      format: logFormatForFile,
      filename: path.join(
        logDir,
        logConfig.server.errorFileName ?? 'server-error.log'
      )
    })
  ]
});

export default logger;
