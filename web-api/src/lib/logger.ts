import {createLogger, traceFunCall} from 'episodehunter-logger';
import {join, normalize} from 'path';
import config from '../config';

const logger = createLogger({
    name: config.appName,
    logLevel: config.logger.level,
    filePath: normalize(join(__dirname, config.logger.filePath)),
    stdout: true,
    ravenDNS: config.logger.ravenDns
});

const registerLogger = server => {

    server.on('request', (request, event, tags) => {
        const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

        levels.forEach(level => {
            if (level in tags) {
                logger[level]({request_id: request.id}, event.data);
            }
        });
    });

    server.on('start', () => {
        logger.info('Server started');
    });

    server.on('stop', () => {
        logger.info('Server shutdown');
    });

    server.on('request-error', (request, err) => {
        if (!request) {
            logger.error('500 response', request, err);
        }
        let data = {
            requestID: request.id,
            requestHeaders: request.headers,
            requestPath: request.route.path,
            requestMethod: request.route.method,
            auth: request.auth,
            error: err
        };
        logger.error('500 response', data);
    });

};

export {logger, registerLogger, traceFunCall};
