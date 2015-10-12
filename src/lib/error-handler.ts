import {logger} from '../lib/logger';

let catchDbError = error => {
    logger.fatal(error);
    throw error;
}

let rejectIfNoResult = data => {
    if (data === undefined || data === null) {
        return Promise.reject(undefined);
    }
    return data;
}

export {catchDbError, rejectIfNoResult};
