import {Parser} from 'xml2js';
import {inject} from 'autoinject';


const parser = new Parser({explicitArray: false});

function parseXmlString(xmlString: string) {
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

export default parseXmlString;
export {parseXmlString};
