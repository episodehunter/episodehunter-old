import {logger} from '../lib/logger';

let catchDbError = error => {
    logger.fatal(error);
    throw error;
}

let rejectIfNoResult = data => {
    if (data === undefined || data === null) {
        return Promise.reject('Error-1: No data was given');
    }
    return data;
}

export default {catchDbError, rejectIfNoResult};
export {catchDbError, rejectIfNoResult};
