let int = obj => obj | 0;

let parseJson = jsonObj => {
    try {
        return JSON.parse(jsonObj);
    } catch (err) {
        return undefined;
    }
};

export default {
    int,
    parseJson
};
export {int, parseJson};
