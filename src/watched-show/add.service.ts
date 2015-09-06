import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';
import {now, int} from '../lib/utility';
import {isNumric, isDefined} from '../lib/national-guard';
import {showRepository as repo} from './add.repository';
import {watchedEpisode} from '../episodehunter-messages/database/watched-episode';
import {scrobbleTypes} from '../episodehunter-messages/constant/scrobble-types';
import {MissingShowError} from '../error/missing-show.error';

function addEpisodesAsWatched(show: WatchedShow, userId: number) {
    return findShowId(show)
        .then(id => repo.addEpisodesAsWatched(extractEpisodes(show, id, userId)));
}

function findShowId(show: WatchedShow): Promise<number> {
    return repo.getShowById(show.ids.id)
        .catch(() => repo.getShowIdByTvdbId(show.ids.tvdbId))
        .catch(() => repo.getShowIdByImdbId(show.ids.imdbId))
        .catch(() => {
            return Promise.reject(new MissingShowError('Can not find show id'));
        });
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


let addWatchedShowService = {
    addEpisodesAsWatched,
    findShowId,
    extractEpisodes
};

export {addWatchedShowService};
