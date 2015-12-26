import {autoInject} from 'autoinject';
import queue from 'episodehunter-queue';
import {WatchedMovie, WatchedShow} from 'eh-domain/model/scrobble/sync';
import {scrobble} from '../../../episodehunter-messages/queue/scrobble';

@autoInject
class WatchedService {

    getWatchedMovies(userId: number): Promise<WatchedMovie[]> {
        return queue.rpc<WatchedMovie[]>(scrobble.sync.watched.movie.get, {userId});
    }

    getWatchedShows(userId: number): Promise<WatchedShow[]> {
        return queue.rpc<WatchedShow[]>(scrobble.sync.watched.show.get, {userId});
    }

    setShowsAsWatched(userId: number, shows: WatchedShow[]): void {
        shows.forEach(show => {
            queue.addToQueue(scrobble.sync.watched.show.add, {userId, show}, {
                attempts: 3,
                backoff: {delay: 60000, type: 'fixed'}
            });
        });
    }

    setMovieAsWatched(userId: number, movies: WatchedMovie[]): void {
        movies.forEach(movie => {
            queue.addToQueue(scrobble.sync.watched.movie.add, {userId, movie}, {
                attempts: 3,
                backoff: {delay: 60000, type: 'fixed'}
            });
        });
    }

}

export {WatchedService};
