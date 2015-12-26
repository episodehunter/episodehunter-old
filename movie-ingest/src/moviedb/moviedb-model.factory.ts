'use strict';

import {MovieDbMovieResponse} from './typings/moviedb-movie-response';
import {MovieDbMovie} from './moviedb.model';

function movieDbModelFactory(response: MovieDbMovieResponse) {
    const movie = new MovieDbMovie();
    movie.budget = response.budget;
    movie.fanart = response.backdrop_path;
    movie.genres = response.genres.map(g => g.name);
    movie.id = response.id;
    movie.imdbId = response.imdb_id;
    movie.originalTitle = response.original_title;
    movie.overview = response.overview;
    movie.poster = response.poster_path;
    movie.productionCompanies = response.production_companies.map(c => c.name);
    movie.releaseDate = response.release_date;
    movie.runtime = response.runtime;
    movie.spokenLanguages = response.spoken_languages.map(l => l.name);
    movie.tagline = response.tagline;
    movie.title = response.title;
    movie.trailer = extractYoutubeTrailer(response.videos);
    return movie;
}

function extractYoutubeTrailer(videos) {
    try {
        return videos.results.find(y => y.site === 'YouTube').key;
    } catch (e) {
        return undefined;
    }
}

export default {movieDbModelFactory};
export {movieDbModelFactory};
