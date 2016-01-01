interface _logger {
    trace(msg: string, ...data: any[]): void;
    debug(msg: string, ...data: any[]): void;
    info(msg: string, ...data: any[]): void;
    warn(msg: string, ...data: any[]): void;
    error(msg: string, ...data: any[]): void;
    fatal(msg: string, ...data: any[]): void;
}

declare function createLogger({name, logLevel, filePath, stdout, ravenDNS}: {
    name: string;
    logLevel?: string;
    filePath: string;
    stdout: boolean;
    ravenDNS: string;
}): _logger;

declare function traceFunCall(target: any, name: string, descriptor: any): any;

declare var logger: _logger;

declare module 'episodehunter-logger' {
    export default logger;
    export {createLogger, logger, traceFunCall};
}