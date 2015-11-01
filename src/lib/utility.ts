let now = () => Math.floor(Date.now() / 1000);
let int = val => parseInt(val, 10);
let as = (column, newName) => `${column} as ${newName}`;
let extractYear = (date: string): number => {
    // Expecting the format to be 'YYYY..'
    return date ? int(date.substr(0, 4)) : 0;
};

let parseInteger = val => {
    if (/^[0-9]+$/.test(val)) {
        return parseInt(val, 10);
    } else {
        return NaN;
    }
};

let isNumric = (...args) => {
    return !args.some(val => parseInteger(val) % 1 !== 0);
};

let isDefined = (...args) => {
    return !args.some(val => (val === undefined || val === null));
};

export default {
    as,
    extractYear,
    int,
    isDefined,
    isNumric,
    now,
    parseInteger
};
export {
    as,
    extractYear,
    int,
    isDefined,
    isNumric,
    now,
    parseInteger
};
