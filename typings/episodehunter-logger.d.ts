interface logger {
    trace(...msg: string[]): void;
    debug(...msg: string[]): void;
    info(...msg: string[]): void;
    warn(...msg: string[]): void;
    error(...msg: string[]): void;
    fatal(...msg: string[]): void;
}

interface createLogger {
    ({name, logLevel, filePath, stdout, ravenDNS}: {
        name: string;
        logLevel?: string;
        filePath: string;
        stdout: boolean;
        ravenDNS: string;
    }): logger;
}

declare module 'episodehunter-logger' {
    export default logger;
    export {createLogger, logger};
}