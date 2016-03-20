const int = obj => obj | 0;

const parseJson = jsonObj => {
    try {
        return JSON.parse(jsonObj);
    } catch (err) {
        return undefined;
    }
};

export {int, parseJson};
