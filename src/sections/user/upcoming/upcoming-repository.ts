'use strict';

import {autoInject} from 'autoinject';
import {database} from '../../../lib/db';

interface UpcompingDatabaseInterface {
    id: number;
    thumbnail: string;
    title: string;
    series_id: number;
    series_title: string;
    series_first_aired: string;
    series_poster: string;
    series_fanart: string;
    season: number;
    episode: number;
    airs: string;
}

@autoInject
class UpcomingRepository {

    get(userId: number): Promise<Array<UpcompingDatabaseInterface>> {
        let today = new Date().toISOString().slice(0, 10);
        let limit = 100;
        let raw = database.q.raw;
        let as = (col, newName) => `${col} as ${newName}`;

        let model = {
            series: database.model.seriesModel,
            episode: database.model.episodeModel,
            follow: database.model.followingSeriesModel
        };

        return database.q
            .select(
                model.episode.id,
                model.episode.thumbnail,
                as(model.episode.title, 'title'),
                as(model.series.id, 'series_id'),
                as(model.series.title, 'series_title'),
                as(model.series.airs.first, 'series_first_aired'),
                as(model.series.poster, 'series_poster'),
                as(model.series.fanart, 'series_fanart')
            )
            .max(as(model.episode.seasonNr, 'season'))
            .min(as(model.episode.episodeNr, 'episode'))
            .min(as(model.episode.firstAired, 'airs'))
            .from(model.follow.$table)
            .leftJoin(model.series.$table, model.follow.seriesId, model.series.id)
            .leftJoin(model.episode.$table, function() {
                this.on(model.follow.seriesId, '=', model.episode.seriesId)
                    .on(model.episode.seasonNr, '!=', raw('0'))
                    .on(model.episode.episodeNr, '!=', raw('0'))
                    .on(model.episode.firstAired, '>=', raw('"' + today + '"'));
            })
            .where(model.follow.userId, '=', userId)
            .where(function() {
                this.where(model.series.status, '=', 'Continuing')
                    .orWhereNotNull(model.episode.episodeNr);
            })
            .groupBy(model.follow.id)
            .orderBy(model.episode.firstAired)
            .limit(limit)
            .then(epesodes => {
                if (!epesodes) {
                    return [];
                }
                return epesodes;
            });
    }

}

export {UpcomingRepository};
