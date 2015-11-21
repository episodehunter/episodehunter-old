import {join, normalize} from 'path';
import {createLogger} from 'bunyan';
import {config} from '../config';

const logger = createLogger({
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

export {logger};
