'use strict';

import {inject} from 'autoinject';
const got = require('got');
import config from '../config';
import {TvdbShow} from './tvdb.model';
import tvDbFactory from './tvdb-model.factory';
import xmlParser from '../lib/xml-parser';

const MIRROR = 'http://thetvdb.com';

class TvDbRepository {
    httpGet;

    constructor(httpGet = got) {
        this.httpGet = httpGet;
    }

    getShow(tvdbid: number): Promise<TvdbShow> {
        const url = `${MIRROR}/api/${config.tvdbAPIkey}/series/${tvdbid}/all/en.xml`;
        return this.httpGet(url)
            .then(({body}) => {
                if (!body) {
                    return Promise.reject<string>('Bad response from server');
                }
                return xmlParser.parseXmlString(body);
            })
            .then(({Data}) => tvDbFactory(Data));
    }

}

export {TvDbRepository};
export default TvDbRepository;
