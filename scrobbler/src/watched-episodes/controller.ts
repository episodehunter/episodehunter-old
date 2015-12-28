import queue from 'episodehunter-queue';
import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import {showIngest} from 'messages/queue/show-ingest';
import {logger} from '../lib/logger';
import {setEpisodesAsWatched, getWatchedEpisodes} from '../watched-episodes/service';
import {MissingShowError} from '../error/missing-show.error';

function setWatched(watchedShow: WatchedShow, userId: number) {
    return setEpisodesAsWatched(watchedShow, userId)
        .catch(error => {
            if (error instanceof MissingShowError) {
                // The show is missing
                // Add it and try agin later
                logger.debug(error.message);
                queue.addToQueue(showIngest.add, watchedShow.ids, {
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
    return getWatchedEpisodes(userId)
        .catch(error => {
            logger.error(error);
            return Promise.reject(error);
        });
}

export {setWatched, getWatched};
export default {setWatched, getWatched};
