import queue from './lib/queue';
import {logger} from './lib/logger';
import {scrobble} from './episodehunter-messages/queue/scrobble';
import episodeController from './watched-episodes/controller';
import movieController from './watched-movies/controller';

function setShowAsWatched(data) {
    return episodeController.setWatched(data.show, data.userId);
}

function getWatchedShows(data) {
    return episodeController.getWatched(data.userId);
}

function setMovieAsWatched(data) {
    return movieController.setWatched(data.movie, data.userId);
}

function getWatchedMovies(data) {
    return movieController.getWatched(data.userId);
}

function processJob(fun) {
    return (job, done) => {
        logger.debug('Getting job', job.data);
        if (!job || !job.data || !job.data.userId) {
            return Promise.reject(`Invalid job data: jobId: ${job.id}`);
        }

        fun(job.data)
            .then(result => {
                done(undefined, result);
            })
            .catch(error => {
                logger.fatal(error);
                done(error);
            });
    };
}

function main() {
    const q = queue.connect();
    q.process(scrobble.sync.watched.show.add, 1, processJob(setShowAsWatched));
    q.process(scrobble.sync.watched.show.get, 10, processJob(getWatchedShows));
    q.process(scrobble.sync.watched.movie.add, 1, processJob(setMovieAsWatched));
    q.process(scrobble.sync.watched.movie.get, 10, processJob(getWatchedMovies));

    logger.info('Hello friend');
}

if (require.main === module) {
    main();
}

export {setShowAsWatched, getWatchedShows, setMovieAsWatched, getWatchedMovies};
