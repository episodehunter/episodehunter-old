'use strict';

import {createLogger} from 'episodehunter-logger';
import {join, normalize} from 'path';
import {config} from '../config';

const logger = createLogger({
    name: config.appName,
    logLevel: config.logger.level,
    filePath: normalize(join(__dirname, config.logger.filePath)),
    stdout: true,
    ravenDNS: config.logger.ravenDns
});

export default logger;
export {logger};
