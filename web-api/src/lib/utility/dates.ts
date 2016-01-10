import {int} from './type-conversion';

const extractYear = (date: string): number => {
    // Expecting the format to be 'YYYY..'
    return date ? int(date.substr(0, 4)) : 0;
};

const isValid = (date: Date): boolean => {
    return !isNaN(date.getTime());
};

const convertToUnixTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000);
};

export default {
    extractYear,
    isValid,
    convertToUnixTimestamp
};
export {extractYear, isValid, convertToUnixTimestamp};
