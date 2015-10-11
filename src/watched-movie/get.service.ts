import {WatchedMovie} from 'eh-domain/model/scrobble/sync';
import {getWatchedMoviesFromDb} from './get.repository';
import {transformMoviesFromDB} from './transformer';

function getWatchedMovies(userId: number): Promise<WatchedMovie[]> {
    return getWatchedMoviesFromDb(userId)
            .then(data => transformMoviesFromDB(data));
}

let getWatchedMoviesService = {
    getWatchedMovies
}

export {getWatchedMoviesService};
