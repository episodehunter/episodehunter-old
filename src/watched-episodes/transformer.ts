import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';
import {watchedEpisode} from '../episodehunter-messages/database/index';
import {scrobbleTypes} from '../episodehunter-messages/constant/scrobble-types';
import {now, int, isNumric} from '../lib/utility';

/**
 * Taking a tv show and extract all episodes.
 * This funtion is usefull before adding episodes as watched in the DB
 */
function extractEpisodesFromGivenShow(show: WatchedShow, showId: number, userId: number): Array<WatchedEpisodeDatabase> {
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

export {extractEpisodesFromGivenShow};
