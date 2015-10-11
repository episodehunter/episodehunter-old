import {queue, Job} from './lib/queue';
import {logger} from './lib/logger';
import {scrobble} from './episodehunter-messages/queue/scrobble';
import * as episodeController from './watched-episodes/controller';
import * as movieController from './watched-movies/controller';


queue.process(scrobble.sync.watched.show.add, 1, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.show || !job.data.userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    episodeController.setWatched(job.data.show, job.data.userId)
        .then(data => done(undefined, data))
        .catch(error => done(error));
});

queue.process(scrobble.sync.watched.show.get, 10, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    episodeController.getWatched(job.data.userId)
        .then(data => done(undefined, data))
        .catch(error => done(error));
});

queue.process(scrobble.sync.watched.movie.add, 1, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    let data = job.data.movie;
    let userId = job.data.userId;

    if (!data || !userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    movieController.setWatched(data, userId)
        .then(result => done(undefined, result))
        .catch(error => done(error));
});

queue.process(scrobble.sync.watched.movie.get, 10, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    let data = job.data.movie;
    let userId = job.data.userId;

    if (!data || !userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    movieController.getWatched(job.data.userId)
        .then(data => done(undefined, data))
        .catch(error => done(error));
});

logger.info('Hello friend');
