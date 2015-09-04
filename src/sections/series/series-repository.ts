'use strict';

import {autoInject} from 'autoinject';
import {database} from '../../lib/db';
import {as} from '../../lib/utility/database';

interface SeriesDatabaseInterface {
    id: number;
    tvdbId: number;
    imdbId: string;
    title: string;
    dayOfWeek: string;
    time: string;
    first: string;
    genre: string;
    language: string;
    network: string;
    overview: string;
    runtime: string;
    status: string;
    fanart: string;
    poster: string;
}

@autoInject
class SeriesRepository {

    get(seriesId: number): Promise<SeriesDatabaseInterface> {
        let raw = database.q.raw;
        let model = database.model.series;

        return database.q
            .first(
                model.id,
                as(model.tvdbId, 'tvdbId'),
                as(model.imdbId, 'imdbId'),
                as(model.title, 'title'),
                as(model.airs.dayOfWeek, 'dayOfWeek'),
                as(model.airs.time, 'time'),
                as(model.airs.first, 'first'),
                model.genre,
                model.language,
                model.network,
                model.overview,
                model.runtime,
                model.status,
                model.fanart,
                model.poster
            )
            .from(model.$table)
            .where(model.id, '=', seriesId)
            .then(series => {
                if (series === undefined) {
                    return Promise.reject(404);
                }
                return series;
            });
    }

}

export {SeriesRepository};
