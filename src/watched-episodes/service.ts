import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import * as setRepo from './set-watched.repository';
import * as getRepo from './get-watched.repository';
import {MissingShowError} from '../error/missing-show.error';
import {transformEpisodesFromDB} from './transformer';

function findShowId(show: WatchedShow): Promise<number> {
    return setRepo.getShowById(show.ids.id)
        .catch(() => setRepo.getShowIdByTvdbId(show.ids.tvdbId))
        .catch(() => setRepo.getShowIdByImdbId(show.ids.imdbId))
        .catch(() => {
            return Promise.reject(new MissingShowError('Can not find show id'));
        });
}

function setEpisodesAsWatched(show: WatchedShow, userId: number) {
    return findShowId(show)
        .then(id => setRepo.setShowAsWatched(show, id, userId));
}

function getWatchedEpisodes(userId: number) {
    return getRepo.getWatchedEpisodes(userId)
        .then(data => transformEpisodesFromDB(data));
}

export {setEpisodesAsWatched, getWatchedEpisodes};
