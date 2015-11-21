import {logger} from '../lib/logger';

const catchDbError = error => {
    logger.fatal(error);
    throw error;
};

const rejectIfNoResult = data => {
    if (data === undefined || data === null) {
        return Promise.reject(undefined);
    }
    return data;
};

export {catchDbError, rejectIfNoResult};
