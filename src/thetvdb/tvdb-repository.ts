'use strict';

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

    getShowAndEpisode(tvdbId: number): Promise<TvdbShow> {
        const url = `${MIRROR}/api/${config.tvdbAPIkey}/series/${tvdbId}/all/en.xml`;
        return this.makeCall(url)
            .then(({Data}) => tvDbFactory.tvdbShowFactory(Data));
    }

    getShow(tvdbId: number): Promise<TvdbShow> {
        const url = `${MIRROR}/api/${config.tvdbAPIkey}/series/${tvdbId}/en.xml`;
        return this.makeCall(url)
            .then(({Data}) => tvDbFactory.tvdbShowFactory(Data));
    }

    getEpisode(tvdbId: number) {
        const url = `${MIRROR}/api/${config.tvdbAPIkey}/episodes/${tvdbId}/en.xml`;
        return this.makeCall(url)
            .then(({Data}) => tvDbFactory.tvdbEpisodeFactory(Data));
    }

    makeCall(url: string) {
        return this.httpGet(url)
            .then(({body}) => {
                if (!body) {
                    return Promise.reject<string>('Bad response from server');
                }
                return xmlParser.parseXmlString(body);
            });
    }

}

export {TvDbRepository};
export default TvDbRepository;
