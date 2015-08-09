'use strict';

import {autoInject} from 'autoinject';
import {db as Database} from '../../lib/db';

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
    db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    get(seriesId: number): Promise<SeriesDatabaseInterface> {
        let limit = 100;
        let raw = this.db.q.raw;
        let model = this.db.model.seriesModel;
        let as = (column, newName) => `${column} as ${newName}`;

        let k = this.db.q
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
            .limit(limit)
            .catch(wtf => {
                console.log('FEL FEL FEL!!!', wtf);
                return Promise.reject(wtf);
            })
            .then(series => {
                if (series === undefined) {
                    return Promise.reject(404);
                }
                return series;
            });
        return k;
    }

}

export {SeriesRepository};
