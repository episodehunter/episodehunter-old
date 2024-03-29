interface _logger {
    trace(msg: string, ...data: any[]): void;
    debug(msg: string, ...data: any[]): void;
    info(msg: string, ...data: any[]): void;
    warn(msg: string, ...data: any[]): void;
    error(msg: string, ...data: any[]): void;
    fatal(msg: string, ...data: any[]): void;
}

export var logger: _logger;
export function createLogger({name, logLevel, filePath, stdout, ravenDNS}: {
    name: string;
    logLevel?: string;
    filePath: string;
    stdout: boolean;
    ravenDNS: string;
}): _logger;
export function traceFunCall(target: any, name: string, descriptor: any): any;
