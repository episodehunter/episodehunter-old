'use strict';

const got = require('got');
import config from '../config';
import {movieDbModelFactory} from './moviedb-model.factory';
import MovieDbMovie from './moviedb.model';

const baseUrl = config.theMovieDb.url;
const apiKey = config.theMovieDb.api;

class MovieDbRepository {
    httpGet;

    constructor(httpGet = got) {
        this.httpGet = httpGet;
    }

    getMovie(movieDbId: number): Promise<MovieDbMovie> {
        const url = `${baseUrl}${movieDbId}?api_key=${apiKey}`;
        return Promise.all([
            this.makeCall(url),
            this.getTrailer(movieDbId)
        ])
        .then(([movie, trailer]) => {
            movie.trailer = trailer;
            return movieDbModelFactory(movie);
        });
    }

    getTrailer(movieDbId: number): Promise<string> {
        const url = `${baseUrl}${movieDbId}/videos?api_key=${apiKey}`;
        return this.makeCall(url)
            .then(videos => {
                if (!Array.isArray(videos.results)) {
                    return Promise.reject('Bad trailer response from server');
                } else {
                    return videos.results;
                }
            })
            .then(results => results.find(y => y.site === 'YouTube') || {})
            .then(trailer => trailer.key);
    }

    makeCall(url: string) {
        return this.httpGet(url, {
            json: true,
            timeout: 3000
        })
        .then(({body}) => {
            if (!body) {
                return Promise.reject('Bad response from server. Body is ' + body);
            }
            return body;
        });
    }

}

export {MovieDbRepository};
export default MovieDbRepository;
