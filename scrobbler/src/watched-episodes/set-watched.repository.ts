'use strict';

import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';
import {show, watchedEpisode} from 'messages/database/index';
import {database} from '../lib/database';
import {catchDbError, rejectIfNoResult} from '../lib/error-handler';
import {isNumric} from '../lib/utility';
import {extractEpisodesFromGivenShow} from './transformer';

function getShowIdByTvdbId(tvdbId: number): Promise<number> {
    if (!isNumric(tvdbId)) {
        return Promise.reject('Invalid tvdbId');
    }

    return database
        .first(show.id)
        .from(show.$table)
        .where(show.tvdbId, tvdbId)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function getShowIdByImdbId(imdbId: string): Promise<number> {
    if (typeof imdbId !== 'string') {
        return Promise.reject('Invalid imdbId');
    }

    return database
        .first(show.id)
        .from(show.$table)
        .where(show.imdbId, imdbId)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function getShowById(id: number): Promise<number> {
    if (!isNumric(id)) {
        return Promise.reject('Invalid id');
    }

    return database
        .first(show.id)
        .from(show.$table)
        .where(show.id, id)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function setEpisodesAsWatched(watchedEpisodes: Array<WatchedEpisodeDatabase>): Promise<void> {
    if (!Array.isArray(watchedEpisodes) || watchedEpisodes.length === 0) {
        return Promise.reject('Invalid data to insert');
    }

    return database
        .insert(watchedEpisodes)
        .into(watchedEpisode.$table)
        .catch(catchDbError);
}

function setShowAsWatched(watchedShow: WatchedShow, showId: number, userId: number): Promise<void> {
    return setEpisodesAsWatched(
        extractEpisodesFromGivenShow(watchedShow, showId, userId)
    );
}

export {
    setShowAsWatched,
    getShowIdByImdbId,
    getShowIdByTvdbId,
    getShowById,
    setEpisodesAsWatched
};
export default {
    setShowAsWatched,
    getShowIdByImdbId,
    getShowIdByTvdbId,
    getShowById,
    setEpisodesAsWatched
};
