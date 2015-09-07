import {WatchedMovie} from 'eh-domain/model/scrobble/sync';
import {movieRepository as repo} from './add.repository';
import {MissingMovieError} from '../error/missing-movie.error';

function setMovieAsWatched(movie: WatchedMovie, userId: number) {
    return findMovieId(movie)
        .then(id => repo.setMovieAsWatched(repo.prepareMovie(movie, id, userId)));
}

function findMovieId(movie: WatchedMovie): Promise<number> {
    return repo.getMovieById(movie.ids.id)
        .catch(() => repo.getMovieIdByTheMoveDbId(movie.ids.theMoveDb))
        .catch(() => repo.getShowIdByImdbId(movie.ids.imdb))
        .catch(() => {
            return Promise.reject(new MissingMovieError('Can not find movie id'));
        });
}

export {setMovieAsWatched};
