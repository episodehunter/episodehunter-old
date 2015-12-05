import {WatchedMovie} from 'eh-domain/model/scrobble/sync';
import {MissingMovieError} from '../error/missing-movie.error';
import {movieRepository as repo} from './set-watched.repository';
import {getWatchedMoviesFromDb} from './get-watched.repository';
import {transformMoviesFromDB} from './transformer';

function setMovieAsWatched(movie: WatchedMovie, userId: number) {
    return findMovieId(movie)
        .then(id => repo.setMovieAsWatched(repo.prepareMovie(movie, id, userId)));
}

function getWatchedMovies(userId: number): Promise<WatchedMovie[]> {
    return getWatchedMoviesFromDb(userId)
            .then(data => transformMoviesFromDB(data));
}

function findMovieId(movie: WatchedMovie): Promise<number> {
    return repo.getMovieById(movie.ids.id)
        .catch(error => repo.getMovieIdByTheMoveDbId(movie.ids.theMoveDb))
        .catch(error => repo.getMovieIdByImdbId(movie.ids.imdb))
        .catch(error => {
            return Promise.reject(new MissingMovieError('Can not find movie id:' + error));
        });
}

export {setMovieAsWatched, getWatchedMovies};
export default {setMovieAsWatched, getWatchedMovies};
