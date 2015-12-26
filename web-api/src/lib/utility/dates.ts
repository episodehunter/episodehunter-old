import {int} from './type-conversion';

let extractYear = (date: string): number => {
    // Expecting the format to be 'YYYY..'
    return date ? int(date.substr(0, 4)) : 0;
};

export default {
    extractYear
};
export {extractYear};
