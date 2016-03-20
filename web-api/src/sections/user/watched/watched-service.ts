import { autoInject } from 'autoinject';
import { rpc, addToQueue } from 'episodehunter-queue';
import { WatchedMovie, WatchedShow } from 'messages/model/scrobble/sync';
import { scrobble } from 'messages/queue/scrobble';

@autoInject
class WatchedService {

    getWatchedMovies(userId: number): Promise<WatchedMovie[]> {
        return rpc<WatchedMovie[]>(scrobble.sync.watched.movie.get, {userId});
    }

    getWatchedShows(userId: number): Promise<WatchedShow[]> {
        return rpc<WatchedShow[]>(scrobble.sync.watched.show.get, {userId});
    }

    setShowsAsWatched(userId: number, shows: WatchedShow[]): void {
        shows.forEach(show => {
            addToQueue(scrobble.sync.watched.show.add, {userId, show}, {
                attempts: 3,
                backoff: {delay: 60000, type: 'fixed'}
            });
        });
    }

    setMovieAsWatched(userId: number, movies: WatchedMovie[]): void {
        movies.forEach(movie => {
            addToQueue(scrobble.sync.watched.movie.add, {userId, movie}, {
                attempts: 3,
                backoff: {delay: 60000, type: 'fixed'}
            });
        });
    }

}

export {WatchedService};
