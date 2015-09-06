// Always ready, always there

let parseInteger = val => {
    if (/^[0-9]+$/.test(val)) {
        return parseInt(val, 10);
    } else {
        return NaN;
    }
};

let isNumric = (...args) => {
    return args.every(val => parseInteger(val) % 1 === 0);
};

let isDefined = (...args) => {
    return args.every(val => (val !== undefined || val !== null));
};

export {parseInteger, isNumric, isDefined};
