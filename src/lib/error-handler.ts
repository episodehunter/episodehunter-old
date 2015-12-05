import {logger} from '../lib/logger';

const catchDbError = error => {
    logger.fatal(error);
    throw error;
};

const rejectIfNoResult = data => {
    if (data === undefined || data === null) {
        logger.debug('The database did not find any content');
        return Promise.reject(undefined);
    }
    return data;
};

export {catchDbError, rejectIfNoResult};
