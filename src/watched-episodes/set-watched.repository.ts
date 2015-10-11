import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';
import {series, watchedEpisode} from '../episodehunter-messages/database/index';
import {scrobbleTypes} from '../episodehunter-messages/constant/scrobble-types';
import {database} from '../lib/database';
import {catchDbError, rejectIfNoResult} from '../lib/error-handler';
import {now, int, isNumric} from '../lib/utility';


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
    if (typeof imdbId !== 'string') {
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
        extractEpisodes(watchedShow, showId, userId)
    );
}

function extractEpisodes(show: WatchedShow, showId: number, userId: number): Array<WatchedEpisodeDatabase> {
    let result = [];

    if (!isNumric(userId, showId)) {
        return result;
    }

    Object.keys(show.seasons).forEach(season => {
        let episodes = show.seasons[season];
        if (!isNumric(season) || !Array.isArray(episodes)) {
            return;
        }

        episodes
            .forEach(episode => {
                if (!isNumric(episode)) {
                    return;
                }

                result.push({
                    [watchedEpisode.userId]: userId,
                    [watchedEpisode.showId]: showId,
                    [watchedEpisode.season]: int(season),
                    [watchedEpisode.episode]: int(episode),
                    [watchedEpisode.time]: now(),
                    [watchedEpisode.type]: scrobbleTypes.xbmcSync
                });
            });
    });

    return result;
}

export {
    setShowAsWatched,
    getShowIdByImdbId,
    getShowIdByTvdbId,
    getShowById,
    setEpisodesAsWatched,
    extractEpisodes
};
