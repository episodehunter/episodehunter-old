'use strict';

import {Parser} from 'xml2js';

const parser = new Parser({explicitArray: false});

function parseXmlString(xmlString: string): Promise<string> {
    return new Promise((resolve, reject) => {
        parser.parseString(xmlString, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export default {parseXmlString};
export {parseXmlString};
