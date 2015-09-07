import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';
import {series} from '../episodehunter-messages/database/series';
import {watchedEpisode} from '../episodehunter-messages/database/watched-episode';
import {database} from '../lib/database';
import {isNumric} from '../lib/national-guard';
import {logger} from '../lib/logger';

let catchDbError = error => {
    logger.fatal(error);
    throw error;
}

let rejectIfNoResult = data => {
    if (data === undefined || data === null) {
        return Promise.reject(undefined);
    }
    return data;
}

function getShowIdByTvdbId(tvdbId: number): Promise<number> {
    if (!isNumric(tvdbId)) {
        return Promise.reject('Invalid tvdbId');
    }

    return database
        .first(series.id)
        .from(series.$table)
        .where(series.tvdbId, tvdbId)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function getShowIdByImdbId(imdbId: string): Promise<number> {
    if (typeof imdbId === 'string') {
        return Promise.reject('Invalid imdbId');
    }

    return database
        .first(series.id)
        .from(series.$table)
        .where(series.imdbId, imdbId)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function getShowById(id: number): Promise<number> {
    if (!isNumric(id)) {
        return Promise.reject('Invalid id');
    }

    return database
        .first(series.id)
        .from(series.$table)
        .where(series.id, id)
        .catch(catchDbError)
        .then(rejectIfNoResult)
        .then(result => result.id);
}

function addEpisodesAsWatched(watchedEpisodes: Array<WatchedEpisodeDatabase>): Promise<void> {
    if (!Array.isArray(watchedEpisodes) || watchedEpisodes.length === 0) {
        return Promise.reject('Invalid data to insert');
    }

    return database
        .insert(watchedEpisodes)
        .into(watchedEpisode.$table)
        .catch(catchDbError);
}

const showRepository = {
    getShowIdByImdbId,
    getShowIdByTvdbId,
    getShowById,
    addEpisodesAsWatched
};

export {
    showRepository,
    getShowIdByImdbId,
    getShowIdByTvdbId,
    getShowById,
    addEpisodesAsWatched
};
