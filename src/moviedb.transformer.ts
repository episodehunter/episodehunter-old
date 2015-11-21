'use strict';

import utility from './lib/utility';
import MovieDbMovie from './moviedb/moviedb.model';
import {movie as movieTable} from './episodehunter-messages/database/movie';

function transformMovieForDbInsert(movie: MovieDbMovie) {
    return {
        [movieTable.tmdbId]: movie.id,
        [movieTable.imdbId]: movie.imdbId,
        [movieTable.title]: movie.title,
        [movieTable.orginalTitle]: movie.originalTitle,
        [movieTable.tagline]: movie.tagline,
        [movieTable.budget]: movie.budget,
        [movieTable.companies]: JSON.stringify(movie.productionCompanies),
        [movieTable.genre]: JSON.stringify(movie.genres),
        [movieTable.overview]: movie.overview,
        [movieTable.releaseDate]: movie.releaseDate,
        [movieTable.runtime]: movie.runtime,
        [movieTable.spokenLang]: JSON.stringify(movie.spokenLanguages),
        [movieTable.poster]: '',
        [movieTable.fanart]: '',
        [movieTable.trailer]: movie.trailer,
        [movieTable.lastUpdate]: utility.currentUnixtime()
    };
}

export default {transformMovieForDbInsert};
export {transformMovieForDbInsert};
