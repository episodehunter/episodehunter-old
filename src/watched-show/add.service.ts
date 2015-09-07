import {WatchedShow, WatchedEpisodeDatabase} from 'eh-domain/model/scrobble/sync';

import {isNumric, isDefined} from '../lib/national-guard';
import {showRepository as repo} from './add.repository';
import {watchedEpisode} from '../episodehunter-messages/database/watched-episode';
import {chain, pluck} from 'lodash';
import {extractYear} from '../lib/utility';
import {getWatchedEpisodes} from './get.repository';

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

function getWatchedShows(userId: number) {
    return getWatchedEpisodes(userId)
        .then(data => {
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
        });
}


let addWatchedShowService = {
    addEpisodesAsWatched,
    findShowId,
    getWatchedShows
};

export {addWatchedShowService};
