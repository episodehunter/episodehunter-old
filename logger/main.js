'use strict';

import bunyan from 'bunyan';
import raven from 'raven';
import RavenStream from 'bunyan-raven';

let logger;

/*
Levels:
fatal (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
error (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
warn (40): A note on something that should probably be looked at by an operator eventually.
info (30): Detail on regular operation.
debug (20): Anything else, i.e. too verbose to be included in "info" level.
trace (10): Logging from external libraries used by your app or very detailed application logging.
*/
function createLogger({name, logLevel = 'warn', filePath, stdout, ravenDNS}) {
    if (!name) {
        throw new Error('You must specify an application name for the logger');
    }

    const bunyanConfig = {
        name,
        streams: []
    };
    let ravenClient;

    if (stdout) {
        bunyanConfig.streams.push({
            level: logLevel,
            stream: process.stdout
        });
    }

    if (filePath) {
        bunyanConfig.streams.push({
            type: 'rotating-file',
            level: logLevel,
            path: filePath,
            period: '1d',
            count: 30
        });
    }

    if (ravenDNS) {
        ravenClient = new raven.Client(ravenDNS);
        bunyanConfig.streams.push({
            type: 'raw',
            stream: new RavenStream(ravenClient),
            level: 'error'
        });
    }

    const bunyanLogger = bunyan.createLogger(bunyanConfig);

    if (logger === undefined) {
        logger = bunyanLogger;
    }

    return bunyanLogger;
}

function traceFunCall(target, name, descriptor) {
    const {value: orginalMethod} = descriptor;
    descriptor.value = function(...args) {
        logger.trace(`'${name}' is called`);
        const result = orginalMethod.apply(this, args);
        logger.trace(`We have a result from '${name}'`);
        return result;
    };
    return descriptor;
}

export default logger;
export {createLogger, logger, traceFunCall};
