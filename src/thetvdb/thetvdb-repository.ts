import {Parser} from 'xml2js';
const got = require('got');
import {config} from '../config';
import {TvdbShow} from './tvdb-show.model';

const MIRROR = 'http://thetvdb.com';

function getShow(tvdbid: number): Promise<TvdbShow> {
    const url = `${MIRROR}/api/${config.tvdbAPIkey}/series/${tvdbid}/all/en.xml`;
    return got(url)
        .then(({body}) => {
            if (!body) {
                return Promise.reject('Bad response from server');
            }

            var parser = new Parser({explicitArray: false});
            return new Promise((resolve, reject) => {
                parser.parseString(body, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(TvdbShow.factory(result));
                    }
                });
            });
        });
}

const tvdbRepository = {getShow};

export {getShow};
export default tvdbRepository;
