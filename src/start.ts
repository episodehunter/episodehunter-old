import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import {queue, Job, addToQueue} from './lib/queue';
import {logger} from './lib/logger';
import {scrobble} from './episodehunter-messages/queue/scrobble';
import {episodeHandler} from './episodehunter-messages/queue/episode-handler';
import {addWatchedShowService} from './watched-show/add.service';
import {getWatchedShowService} from './watched-show/get.service';
import {MissingShowError} from './error/missing-show.error';

queue.process(scrobble.sync.watched.show.add, 1, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.show || !job.data.userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    let watchedShow: WatchedShow = job.data.show;
    let userId: number = job.data.userId;

    addWatchedShowService
        .addEpisodesAsWatched(watchedShow, userId)
        .then(data => done(undefined, data))
        .catch(error => {
            if (error instanceof MissingShowError) {
                // The show is missing
                // Add it and try agin later
                logger.debug(error.message);
                addToQueue(episodeHandler.show.add, watchedShow.ids, {
                    attempts: 3,
                    backoff: {delay: 60000, type: 'fixed'}
                });
                done(error.message);
            } else {
                // Something bad has happened
                // There's blood everywhere
                logger.error(error);
                done(error);
            }
        });
});

queue.process(scrobble.sync.watched.show.get, 10, (job: Job, done) => {
    logger.debug('Getting job', job.data);
    if (!job || !job.data || !job.data.userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    let userId: number = job.data.userId;
    getWatchedShowService.getWatchedShows(userId)
        .then(data => done(undefined, data))
        .catch(error => {
            logger.error(error);
            done(error);
        });
});

logger.info('Hello friend');
