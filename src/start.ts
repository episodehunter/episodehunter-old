import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import {queue, Job} from './lib/queue';
import {logger} from './lib/logger';
import {scrobble} from './episodehunter-messages/queue/scrobble';
import {episodeHandler} from './episodehunter-messages/queue/episode-handler';
import {watchedShowService} from './watched-show/service';
import {MissingShowError} from './error/missing-show.error';

queue.process(scrobble.sync.watched.show.add, 1, (job: Job, done) => {
    if (!job || !job.data || !job.data.show || !job.data.userId) {
        let error = 'Invalid job data: jobId: ' + job.id;
        logger.error(error);
        done(new Error(error));
        return;
    }

    let watchedShow: WatchedShow = job.data.show;
    let userId: number = job.data.userId;

    watchedShowService
        .addEpisodesAsWatched(watchedShow, userId)
        .then(data => done(undefined, data))
        .catch(error => {
            if (error instanceof MissingShowError) {
                // The show is missing
                // Add it and try agin later
                queue.create(episodeHandler.show.add, watchedShow.ids);
                done(error);
            } else {
                // Something bad has happened
                // There's blood everywhere
                logger.error(error);
                done(error);
            }
        });
});
