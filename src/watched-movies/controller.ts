import {WatchedMovie} from 'eh-domain/model/scrobble/sync';
import {movieIngest} from '../episodehunter-messages/queue/movie-ingest';
import {addToQueue} from '../lib/queue';
import {logger} from '../lib/logger';
import {MissingMovieError} from '../error/missing-movie.error';
import {setMovieAsWatched, getWatchedMovies} from './service';


function setWatched(watchedMovie: WatchedMovie, userId: number) {
    return setMovieAsWatched(watchedMovie, userId)
        .catch(error => {
            if (error instanceof MissingMovieError) {
                // The movie is missing
                // Add it and try agin later
                logger.debug(error.message);
                addToQueue(movieIngest.add, watchedMovie.ids, {
                    attempts: 3,
                    backoff: {delay: 60000, type: 'fixed'}
                });
                return Promise.reject(error.message);
            } else {
                // Something bad has happened
                // There's blood everywhere
                logger.error(error);
                return Promise.reject(error);
            }
        });
}

function getWatched(userId: number) {
    return getWatchedMovies(userId)
        .catch(error => {
            logger.error(error);
            return Promise.reject(error);
        });
}

export {setWatched, getWatched};
export default {setWatched, getWatched};
