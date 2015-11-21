import {chain, pluck} from 'lodash';
import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';
import {watchedEpisode} from '../episodehunter-messages/database/index';
import {scrobbleTypes} from '../episodehunter-messages/constant/scrobble-types';
import {now, int, isNumric, extractYear} from '../lib/utility';

/**
 * Taking a tv show and extract all episodes.
 * This function is use full before adding episodes as watched in the DB
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

/**
 * Transform watched episodes in the database to a more readable structure
 * @param  {WatchedSeriesDatabaseInterface[]} data
 * @return {}
 */
function transformEpisodesFromDB(data: Array<any>) {
    return <any>chain(data)
        .groupBy('show_id')
        .map(series => {
            return {
                ids: {
                    id: series[0].show_id,
                    tvdb: series[0].show_tvdb_id,
                    imdb: series[0].show_imdb_id
                },
                year: extractYear(series[0].show_first_aired),
                title: series[0].show_title,
                seasons: chain(series)
                    .groupBy('season')
                    .mapValues((episodes: any) => pluck(episodes, 'episode'))
                    .value()
            };
        })
        .value();
}

export {
    extractEpisodesFromGivenShow,
    transformEpisodesFromDB
};

export default {
    extractEpisodesFromGivenShow,
    transformEpisodesFromDB
};
