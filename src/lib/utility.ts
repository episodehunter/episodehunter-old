let now = () => Math.floor(Date.now() / 1000);
let int = val => parseInt(val, 10);
let extractYear = (date: string): number => {
    // Expecting the format to be 'YYYY..'
    return date ? int(date.substr(0, 4)) : 0;
};

export {now, int, extractYear};
