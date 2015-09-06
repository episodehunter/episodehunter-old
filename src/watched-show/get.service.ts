import {chain, pluck} from 'lodash';
import {extractYear} from '../lib/utility';
import {getWatchedEpisodes} from './get.repository';

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

let getWatchedShowService = {
    getWatchedShows
}

export {getWatchedShowService};
