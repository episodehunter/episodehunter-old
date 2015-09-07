import {chain, pluck} from 'lodash';
import {WatchedShow} from 'eh-domain/model/scrobble/sync';
import * as setRepo from './set-watched.repository';
import * as getRepo from './get-watched.repository';
import {extractYear} from '../lib/utility';
import {MissingShowError} from '../error/missing-show.error';


function setEpisodesAsWatched(show: WatchedShow, userId: number) {
    return findShowId(show)
        .then(id => setRepo.setShowAsWatched(show, id, userId));
}

function findShowId(show: WatchedShow): Promise<number> {
    return setRepo.getShowById(show.ids.id)
        .catch(() => setRepo.getShowIdByTvdbId(show.ids.tvdbId))
        .catch(() => setRepo.getShowIdByImdbId(show.ids.imdbId))
        .catch(() => {
            return Promise.reject(new MissingShowError('Can not find show id'));
        });
}

function getWatchedEpisodes(userId: number) {
    return getRepo.getWatchedEpisodes(userId)
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

export {setEpisodesAsWatched, getWatchedEpisodes};
