import {inject} from 'autoinject';
const got = require('got');
import config from '../config';
import {TvdbShow} from './tvdb.model';
import tvDbFactory from './tvdb-model.factory';
import parseXmlString from '../lib/xml-parser';

const MIRROR = 'http://thetvdb.com';

class TvDbRepository {
    got;

    constructor(@inject(got) got) {
        this.got = got;
    }

    getShow(tvdbid: number): Promise<TvdbShow> {
        const url = `${MIRROR}/api/${config.tvdbAPIkey}/series/${tvdbid}/all/en.xml`;
        return this.got(url)
            .then(({body}) => {
                if (!body) {
                    return Promise.reject('Bad response from server');
                }
                return parseXmlString(body);
            })
            .then(({Data}) => tvDbFactory(Data));
    }

}

export {TvDbRepository};
export default TvDbRepository;
