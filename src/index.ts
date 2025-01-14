import { format, toDate } from 'date-fns-tz';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
    private level: LogLevel;
    private timezone: string;

    constructor(level: LogLevel = 'info', timezone: string = 'UTC') {
        this.level = level;
        this.timezone = timezone;
    }

    private formatMessage(level: LogLevel, message: string): string {
        const timestamp = this.getTimestamp();
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    }

    private getTimestamp(): string {
        const now = new Date();
        const zonedDate = toDate(now, { timeZone: this.timezone });
        return format(zonedDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: this.timezone });
    }

    info(message: string): void {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message));
        }
    }

    warn(message: string): void {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message));
        }
    }

    error(message: string): void {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message));
        }
    }

    debug(message: string): void {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message));
        }
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }

    setTimezone(timezone: string): void {
        this.timezone = timezone;
    }
}

export default Logger;
