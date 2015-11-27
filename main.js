'use strict';

import bunyan from 'bunyan';
import raven from 'raven';
import RavenStream from 'bunyan-raven';

let logger;

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
            level: 'warning'
        });
    }

    const bunyanLogger = bunyan.createLogger(bunyanConfig);

    if (logger === undefined) {
        logger = bunyanLogger;
    }

    return bunyanLogger;
}

export default logger;
export {createLogger, logger};
