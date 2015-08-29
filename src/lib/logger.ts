import {join, normalize} from 'path';
import {createLogger} from 'bunyan'
import {config} from '../config/index';

let logger = createLogger({
    name: config.appName,
    streams: [{
        level: config.logger.level,
        stream: process.stdout
    }, {
        type: 'rotating-file',
        level: config.logger.level,
        path: normalize(join(__dirname, config.logger.filePath)),
        period: '1d',
        count: 30
    }]
});

let registerLogger = server => {

    server.on('request', (request, event, tags) => {
        let levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

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

}

export {logger, registerLogger};
