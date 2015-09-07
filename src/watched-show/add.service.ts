import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';

import {isNumric, isDefined} from '../lib/national-guard';
import {showRepository as repo} from './add.repository';
import {watchedEpisode} from '../episodehunter-messages/database/watched-episode';

import {MissingShowError} from '../error/missing-show.error';

function addEpisodesAsWatched(show: WatchedShow, userId: number) {
    return findShowId(show)
        .then(id => repo.addShowAsWatched(show, id, userId));
}

function findShowId(show: WatchedShow): Promise<number> {
    return repo.getShowById(show.ids.id)
        .catch(() => repo.getShowIdByTvdbId(show.ids.tvdbId))
        .catch(() => repo.getShowIdByImdbId(show.ids.imdbId))
        .catch(() => {
            return Promise.reject(new MissingShowError('Can not find show id'));
        });
}


let addWatchedShowService = {
    addEpisodesAsWatched,
    findShowId
};

export {addWatchedShowService};
