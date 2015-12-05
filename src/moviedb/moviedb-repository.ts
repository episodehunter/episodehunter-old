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
        const url = `${baseUrl}${movieDbId}?api_key=${apiKey}&append_to_response=videos`;
        return this.makeCall(url).then(movie => {
            return movieDbModelFactory(movie);
        });
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
