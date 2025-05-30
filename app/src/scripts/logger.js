import { app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
  constructor() {
    // Use user data directory for logs in production
    this.logDir = app.isPackaged
      ? path.join(app.getPath('userData'), 'logs')
      : path.join(path.dirname(__dirname), '../../logs');

    this.setupLogDirectory();
  }

  setupLogDirectory() {
    try {
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
      }
    } catch (error) {
      // Fallback to temp directory if we can't create/access the log directory
      this.logDir = path.join(app.getPath('temp'), 'clearcare-logs');
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(level, message, error = null) {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = `[${timestamp}] ${level}: ${message}${
        error ? '\n' + error.stack : ''
      }\n`;

      // Log file path with date-based rotation
      const logFile = path.join(
        this.logDir,
        `clearcare-${new Date().toISOString().split('T')[0]}.log`
      );

      // Append to log file
      fs.appendFileSync(logFile, logEntry);

      // Also log to console in development
      if (!app.isPackaged) {
        console[level.toLowerCase()](message, error || '');
      }
    } catch (err) {
      // If all logging fails, at least try console
      console.error('Logging failed:', err);
    }
  }

  error(message, error = null) {
    this.log('ERROR', message, error);
  }

  info(message) {
    this.log('INFO', message);
  }

  warn(message) {
    this.log('WARN', message);
  }
}

export const logger = new Logger();
